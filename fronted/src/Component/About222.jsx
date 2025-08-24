import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function AboutPageMUI222222() {
  return (
    <Box sx={{ maxWidth: 800, margin: "40px auto", p: 3 }}>
      <Paper elevation={4} sx={{ p: 5, background: "#fffbea",direction:"rtl" }}>
        <Typography variant="h3"  gutterBottom align="center" sx={{color:"#3682A1"}}>
          ברוכים הבאים לאתר הפרסום המוביל בישראל!
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" gutterBottom sx={{color:"brown"}}>
          למה לבחור בנו?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          האתר שלנו מעניק לך את הדרך הקלה, המהירה והיעילה ביותר לפרסם מודעות, שירותים ומוצרים – ולהגיע בדיוק לקהל היעד שלך.
          עם ממשק מתקדם, ניהול חכם של חבילות פרסום, ותמיכה אישית – תוכל להגדיל את החשיפה שלך ולהשיג תוצאות אמיתיות!
        </Typography>
        <List >
          <ListItem>
            <ListItemIcon>
              <CampaignIcon sx={{color:"#3682A1"}} />
            </ListItemIcon>
            <ListItemText sx={{textAlign:"start"}}
              primary="פרסום מודעות בקלות"
              secondary="העלה מודעה חדשה תוך שניות, בחר קטגוריה, הוסף תמונה ותיאור – וזהו, אתה באוויר!"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TrendingUpIcon sx={{color:"#F0BD52"}}/>
            </ListItemIcon>
            <ListItemText sx={{textAlign:"start"}}
              primary="מעקב ובקרה"
              secondary="עקוב אחרי סטטיסטיקות, צפיות, פניות ויתרת חבילות הפרסום שלך – הכל במקום אחד."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon  sx={{color:"brown"}} />
            </ListItemIcon>
            <ListItemText sx={{textAlign:"start"}}
              primary="ניהול מתקדם"
              secondary="נהל את כל הפרסומים, ההשכרות והחבילות שלך בקלות וביעילות."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SupportAgentIcon  sx={{color:"black"}} />
            </ListItemIcon>
            <ListItemText sx={{textAlign:"start"}}
              primary="שירות ותמיכה"
              secondary="צוות התמיכה שלנו כאן בשבילך לכל שאלה, בעיה או הצעה לשיפור."
            />
          </ListItem>
        </List>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" color="primary" align="center" sx={{ mb: 2,color:"#3682A1" }}>
          הצטרף עכשיו ותתחיל לפרסם בקלות, במהירות ובחכמה!
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          האתר פותח מתוך אהבה לעולם הפרסום והרצון להנגיש אותו לכל אחד.  
          נשמח לקבל מכם משוב, רעיונות והצעות – יחד נמשיך להשתפר!
        </Typography>
      </Paper>
    </Box>
  );
}