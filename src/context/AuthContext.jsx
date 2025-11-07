import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function apiRequest(path, options = {}) {
    try {
        const res = await fetch(`${API}${path}`, {
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            ...options,
        });

        // Always log the raw response in development
        // if (process.env.NODE_ENV === 'development') {
        //     console.log(`API Response for ${path}:`, {
        //         status: res.status,
        //         statusText: res.statusText,
        //         headers: Object.fromEntries(res.headers.entries())
        //     });
        // }

        const body = await res.json().catch(() => ({}));

        if (!res.ok) {
            // Include more details in the error
            throw new Error(body.message || `Request failed with status ${res.status}`);
        }

        return body;
    } catch (error) {
        console.error(`API Error for ${path}:`, {
            message: error.message,
            response: error.response,
            stack: error.stack
        });
        throw error; // Preserve the original error
    }
}

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const signin = async ({ email, password }) => {
        try {
            // Validate inputs
            if (!email?.trim()) {
                throw new Error("Email is required");
            }
            if (!password?.trim()) {
                throw new Error("Password is required");
            }

            // normalize input
            const emailNormalized = email.trim().toLowerCase();
            
            // Debug log the request (remove in production)
            // console.log("Sending signin request:", {
            //     email: emailNormalized,
            //     hasPassword: !!password
            // });

            const data = await apiRequest("/api/auth/signin", {
                method: "POST",
                body: JSON.stringify({ 
                    email: emailNormalized, 
                    password 
                }),
            });

            // Log the response structure in development
            // if (process.env.NODE_ENV === 'development') {
            //     console.log("Signin response structure:", {
            //         hasToken: !!data.token || !!(data?.data?.token),
            //         hasUser: !!data.user || !!(data?.data?.user),
            //         responseKeys: Object.keys(data)
            //     });
            // }

            // Extract token and user with detailed error if missing
            const token = data.token || data?.data?.token;
            if (!token) {
                throw new Error("Server response missing authentication token");
            }

            const returnedUser = data.user || data?.data?.user || data;
            if (!returnedUser?.email) {
                throw new Error("Server response missing user data");
            }

            localStorage.setItem("token", token);
            setUser(returnedUser);
            navigate("/dashboard", { replace: true });
            return { token, user: returnedUser };
        } catch (error) {
            console.error("SignIn failed:", {
                message: error.message,
                originalError: error
            });
            // Provide more specific error messages
            if (error.message.includes("Failed to fetch")) {
                throw new Error("Unable to connect to server. Please check your internet connection.");
            }
            throw new Error(error.message || "Invalid email or password");
        }
    };


    const signUp = async ({ name, email, password, role = "client" }) => {
        try {
            if (!name || !email || !password) {
                throw new Error("Name, email and password are required");
            }

            const data = await apiRequest("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ name, email, password, role }),
            });

            const token = data.token || data?.data?.token;
            const returnedUser = data.user || data?.data?.user || data;

            if (!token || !returnedUser) {
                throw new Error(data.message || "Invalid response from server");
            }

            localStorage.setItem("token", token);
            setUser(returnedUser);
            navigate("/dashboard", { replace: true });
            return { token, user: returnedUser };
        } catch (error) {
            console.error("SignUp failed:", error);
            throw new Error(error.message || "Failed to create account");
        }
    };

    // const signOut = () => {
    //     localStorage.removeItem("token");
    //     setUser(null);
    //     navigate("/account/signin", { replace: true });
    // };

    async function signOut(options = {}) {
        try {
            // options: { callbackUrl?: string, redirect?: boolean }
            localStorage.removeItem('token');
            setUser(null);
            // optionally redirect
            if (options.redirect && options.callbackUrl) {
                // use full navigation to ensure auth state cleared
                window.location.href = options.callbackUrl;
            }
            return true;
        } catch (err) {
            console.error('signOut error', err);
            return false;
        }
    }

    // Check authentication status on mount and token change
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const data = await apiRequest("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // support both { user } or user object response
                const returnedUser = data.user || data?.data?.user || data;
                setUser(returnedUser);
            } catch (error) {
                console.warn("Auth check failed:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);



    // for Clients Tab fetching api functions
    async function getClients() {
        const token = localStorage.getItem("token");
        return apiRequest("/api/clients/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async function deleteClient(clientId) {
        const token = localStorage.getItem("token");
        return apiRequest(`/api/clients/${clientId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }


    // admin client creation
    async function adminCreateClient(clientData) {
        const token = localStorage.getItem("token");
        // console.log('Sending client data:', clientData); // Debug log
        
        return apiRequest("/api/clients/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clientData)
        });
    }


    // for Staffs Tab fetching api functions
    async function getStaffs() {
        const token = localStorage.getItem("token");
        return apiRequest("/api/staffs/list", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async function deleteStaff(staffId) {
        const token = localStorage.getItem("token");
        return apiRequest(`/api/staffs/${staffId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // admin staff creation
    async function adminCreateStaff(staffData) {
        const token = localStorage.getItem("token");
        // console.log('Sending client data:', clientData); // Debug log
        
        return apiRequest("/api/staffs/create", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(staffData)
        });
    }

    const value = {
        user,
        loading,
        signin,
        signUp,
        signOut,
        isAuthenticated: !!user,
        getClients,
        deleteClient,
        adminCreateClient,
        getStaffs,
        deleteStaff,
        adminCreateStaff,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};