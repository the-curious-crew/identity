import { useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOTP = async (phoneNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/auth/send-otp", { phoneNumber });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const validateOTP = async (phoneNumber: string, otp: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/auth/validate-otp", {
        phoneNumber,
        otp,
      });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async (credentials: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/auth/authenticate", credentials);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/auth/refresh-token", { token });
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendOTP,
    validateOTP,
    authenticate,
    refreshToken,
  };
};

export default useAuth;
