// import * as React from "react";
// import { Card, CardContent, Typography } from "@mui/material";
//
// export default function KpiCard({ label, value, delta }) {
//     return (
//         <Card
//             variant="outlined"
//             sx={{
//                 borderRadius: 3,
//                 minWidth: 180,
//                 textAlign: "center",
//                 boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
//             }}
//         >
//             <CardContent>
//                 <Typography variant="subtitle2" color="text.secondary">
//                     {label}
//                 </Typography>
//                 <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
//                     {value}
//                 </Typography>
//                 {delta !== undefined && (
//                     <Typography
//                         variant="body2"
//                         sx={{ mt: 0.5, color: delta >= 0 ? "green" : "red" }}
//                     >
//                         {delta >= 0 ? `▲ ${delta}%` : `▼ ${Math.abs(delta)}%`}
//                     </Typography>
//                 )}
//             </CardContent>
//         </Card>
//     );
// }
