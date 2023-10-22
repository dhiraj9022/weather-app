import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function Page404() {
    let navigate = useNavigate();

    useEffect(() => {
        // Show the alert message
        Swal.fire({
            title: "OOPS !!! Page Not Found",
            text: "You will be redirected to the dashboard",
            icon: "success",
        }).then((result) => {
            // Redirect to the homepage after the user clicks the alert button
            if (result.isConfirmed) {
                navigate("/");
            }
        });
    }, [navigate]);

    return (
        <>
            <Typography variant="h6" component="h2">
               Page 404 not found
            </Typography>
        </>
    )
}

export default Page404