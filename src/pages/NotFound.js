import React from "react";

function NotFound() {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="text-center">
                <h1 className="text-danger">404 - Not Found</h1>
                <p className="text-muted">The page you are looking for does not exist.</p>
            </div>
        </div>
    );
}

export default NotFound;
