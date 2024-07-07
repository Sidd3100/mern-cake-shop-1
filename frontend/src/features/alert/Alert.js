import React from "react";
import PropTypes from "prop-types";
import { XCircleIcon } from "@heroicons/react/20/solid";

const Alert = ({ color, children }) => {
    const colorClasses = {
        red: "bg-red-100 text-red-700 border-red-400",
        green: "bg-green-100 text-green-700 border-green-400",
        blue: "bg-blue-100 text-blue-700 border-blue-400",
        yellow: "bg-yellow-100 text-yellow-700 border-yellow-400",
    };

    return (
        <div className={`border-l-4 p-4 ${colorClasses[color]}`} role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                    <p className="text-sm">{children}</p>
                </div>
            </div>
        </div>
    );
};

Alert.propTypes = {
    color: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Alert;
