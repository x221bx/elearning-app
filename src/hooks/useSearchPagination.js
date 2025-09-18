import { useMemo, useState, useEffect } from "react";

export default function useSearchPagination(list, {
    perPage = 8,
    query = "",
    keys = [],
    normalize = (s) => s.toLowerCase(),
} = {}) {
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = normalize(query || "").trim();
        if (!q) return list || [];
        return (list || []).filter(item =>
            keys.some(k => normalize(String(item?.[k] ?? "")).includes(q))
        );
    }, [list, query]);

    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = useMemo(
        () => filtered.slice((page - 1) * perPage, page * perPage),
        [filtered, page, perPage]
    );

    useEffect(() => { setPage(1); }, [filtered.length]);

    return { page, setPage, pageCount, paginated, filtered, total: filtered.length };
}
