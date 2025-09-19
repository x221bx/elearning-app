// src/components/common/customPagination.jsx
import React from "react";
import { Pagination } from "@mui/material";

export function CustomPagination({
                                     count,
                                     page,
                                     onChange,
                                     colorHex = "#FFC107",
                                     hoverHex = "#FFB300",
                                     variant = "outlined",
                                     shape = "rounded",
                                     sx,
                                     ...props
                                 }) {
    return (
        <Pagination
            count={count}
            page={page}
            onChange={onChange}
            variant={variant}
            shape={shape}
            sx={{
                "& .MuiPaginationItem-root": {
                    borderRadius: 8,
                    border: "1px solid",
                    borderColor: colorHex,
                    transition: "all .15s ease",
                    "&:hover": {
                        backgroundColor: `${colorHex}20`,
                        borderColor: colorHex
                    }
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: colorHex,
                    borderColor: colorHex,
                    color: "#111",
                    fontWeight: 700,
                    "&:hover": {
                        backgroundColor: hoverHex,
                        borderColor: hoverHex
                    }
                },
                ...sx
            }}
            {...props}
        />
    );
}

export default CustomPagination;
