// AboutPageMUI.jsx

import React from 'react';
import { Box, Typography, Container, Button, Divider } from '@mui/material';

const AboutPageMUI = () => {
  return (
    <Box sx={{ direction:"rtl"}}>
      {/* Hero Section */}
      <Box
        sx={{
          borderButton:"solid",
          py: 7, // padding-top and padding-bottom
          // bgcolor: 'primary.main', // צבע רקע ראשי מה-Theme
          color: 'brown', // צבע טקסט עבור רקע כזה
          textAlign: 'center',
          mb: 6, // margin-bottom
          borderBottom:"solid ",
          borderTop:"solid "
          
        
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold'}}>
            הסיפור מאחורי ההצלחה שלך
          </Typography>
          <Typography variant="h5" component="p">
            מובילים את עולם הפרסום הדיגיטלי עם פתרונות יצירתיים ותוצאות מוכחות.
          </Typography>
        </Container>
      </Box>


      {/* About Section: Our Story */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3682A1' }}>
            הסיפור שלנו
          </Typography>
          <Typography variant="body1" color="text.secondary">
            כיצד התחלנו ומה מניע אותנו קדימה.
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          אנו בחברת הפרסום advertising מאמינים בכוחו של סיפור טוב ובחשיבותו להצלחה עסקית. מאז הקמתנו בשנת 2010, אנו פועלים בנחישות לחבר בין עסקים לקהל היעד שלהם, באמצעות אסטרטגיות פרסום חדשניות, יצירתיות, ומותאמות אישית.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          הצוות שלנו מורכב ממומחי פרסום דיגיטלי מוכשרים, אנליסטים חדי עין, ומעצבים פורצי דרך, כולם בעלי תשוקה משותפת להביא ללקוחותינו את התוצאות הטובות ביותר. אנו מתמחים במגוון רחב של שירותים, כולל: קמפיינים במדיה חברתית, ניהול קמפיינים ממומנים , יצירת תוכן ויזואלי וטקסטואלי, אסטרטגיות מיתוג, שיווק ועוד.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          הגישה שלנו שמה את הלקוח במרכז. אנו מקשיבים, מנתחים ומפתחים פתרונות שמותאמים בדיוק לצרכים הייחודיים של כל עסק, החל משלב התכנון האסטרטגי ועד ליישום, ניטור ואופטימיזציה מתמדת. המטרה שלנו היא לא רק לעמוד ביעדים, אלא לעבור אותם.
        </Typography>
      </Container>

      {/* Vision Section */}
      <Box
        sx={{
          py: 8,
          borderBottom:"solid #3682A1",
          borderTop:"solid #3682A1",
          // bgcolor: '#f3aeae', // צבע רקע אפור בהיר מה-Theme
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3682A1' }}>
            החזון שלנו
          </Typography>
          <Typography variant="h6" component="p" color="text.primary" sx={{ mb: 3 }}>
            להוביל את עתיד הפרסום.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            אנו שואפים להיות חברת הפרסום הדיגיטלי המובילה והחדשנית ביותר באזור, המוכרת בזכות יכולתה לספק פתרונות פורצי דרך ותוצאות עסקיות יוצאות דופן. אנו מחויבים ללמידה מתמדת, התאמה לשינויים בשוק, ושמירה על סטנדרטים גבוהים של מקצועיות, יושרה ושקיפות בכל אינטראקציה. אנו מאמינים שבשיתוף פעולה אמיתי, נוכל להגשים כל חזון שיווקי.
          </Typography>
        </Container>
      </Box>

      {/* Optional: Call to Action / Contact */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h5" component="h3" gutterBottom>
            בואו ניצור יחד את סיפור ההצלחה הבא שלך.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            צרו קשר עוד היום כדי לשמוע כיצד נוכל לעזור לעסק שלכם לצמוח.
          </Typography>
          {/* כאן ניתן להוסיף כפתור ליצירת קשר או ניווט */}
          {/* <Button variant="contained" color="primary" size="large">
            צרו קשר
          </Button> */}
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPageMUI;