import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard = ({ image, title, description }) => {
    return (
        <Card sx={{ maxWidth: { xs: 300, sm: 345 }, margin: 'auto' }}>
            <CardMedia
                component="img"
                image={image}
                title={title}
                sx={{
                    height: { xs: 100, sm: 120 }, // أصغر من قبل
                    width: { xs: 120, sm: 140 },  // عرض أصغر
                    objectFit: "contain",          // تحافظ على نسب الصورة
                    mx: "auto",                    // توسيط الصورة
                    mt: 2,                         // مسافة من فوق
                }}
            />

            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MediaCard;
