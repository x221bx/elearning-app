// src/components/teacher/TeacherList.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Box } from "@mui/material";
import TeacherCard from "./TeacherCard.jsx";
import CustomPagination from "../common/customPagination.jsx";
import { teachers as fallbackData } from "../../api/teachers";

export default function TeacherList({ teachers }) {
    const source = Array.isArray(teachers) && teachers.length ? teachers : fallbackData;

    const [page, setPage] = useState(1);
    const perPage = 8;

    const allTeachers = useMemo(() => source, [source]);
    const pageCount = Math.max(1, Math.ceil(allTeachers.length / perPage));

    useEffect(() => {
        if (page > pageCount) setPage(pageCount);
    }, [pageCount]);

    const paginated = useMemo(
        () => allTeachers.slice((page - 1) * perPage, page * perPage),
        [allTeachers, page, perPage]
    );

    return (
        <Box sx={{ display: "grid", gap: 2 }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 2
                }}
            >
                {paginated.map((t) => (
                    <TeacherCard
                        key={t.id}
                        id={t.id}
                        image={t.image}
                        name={t.name}
                        rating={t.rating}
                        description={t.bio || t.description}
                    />
                ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CustomPagination
                    count={pageCount}
                    page={page}
                    onChange={(_, p) => setPage(p)}
                />
            </Box>
        </Box>
    );
}
