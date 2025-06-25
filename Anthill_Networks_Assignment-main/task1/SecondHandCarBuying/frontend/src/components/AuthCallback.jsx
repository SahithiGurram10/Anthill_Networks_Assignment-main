import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("Session Data:", data);
    console.log("Session Error:", error);
      if (error || !data.session) {
        alert("Authentication failed!");
        console.log(error);
        
        navigate("/"); 
        return;
      }

      const user = data.session.user;
      console.log("Authenticated User:", user.email);

      const { data: existingUser, error: fetchError } = await supabase
        .from("profiles") 
        .select("*")
        .eq("email", user.email)
        .single();

      if (fetchError) {
        console.error("Error fetching user:", fetchError.message);
      }
      if (!existingUser) {
        const { error: insertError } = await supabase
          .from("profiles") 
          .insert([
            {
              id: user.id, 
              email: user.email,
              full_name: user.user_metadata.full_name,
              avatar_url: user.user_metadata.avatar_url,
            },
          ]);

        if (insertError) {
          console.error("Error inserting user:", insertError.message);
        } else {
          console.log("User profile created successfully!");
        }
      }

      if (user.email === "admin@carspace.com") {
        navigate("/admin-dashboard");
      } else {
        navigate("/home");
      }
    };

    handleAuth();
  }, [navigate]);

  return <h1>Logging in...</h1>;
};

export default AuthCallback;
