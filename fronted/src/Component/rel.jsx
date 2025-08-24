import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Tabs, Tab, Typography, CircularProgress, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { delRealization, getRealizations, updateRealization } from '../redux/RentalHistorySlice';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';





export default function Rel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [editOpen, setEditOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [editDate, setEditDate] = useState('');
    const [editNotes, setEditNotes] = useState('');

    let user = useSelector((state) => state.userReducer);
    useEffect(() => {
        if (user?.data) {
            dispatch(getRealizations(user.data));
        }
    }, [dispatch, user]);

    let realizations = useSelector((state) => state.RentalHistoryReducer.realization)

    const isLoaded = Array.isArray(realizations?.data);
    const rows = isLoaded ? realizations.data : [];

    useEffect(() => {
        if (isLoaded && rows.length === 0) {
            console.log("No realizations found, redirecting to ActiveRental");
            //    navigate('/ActiveRental');
        }
    }, [isLoaded, rows.length, navigate]);

    //אם רכישות לא נטענו, מציג הודעת טעינה
    if (!isLoaded) {
        return (
            <>
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress sx={{ color: "brown" }} />
                    <CircularProgress sx={{ color: "#F0BD52" }} />
                    <CircularProgress sx={{ color: "#3682A1" }} />
                </Stack> <div style={{ direction: 'rtl' }}>טוען נתונים...</div>
            </>
        )

    }
    const { past, future } = splitRowsByDate(rows);
    const columns = [
        {
            field: 'date',
            headerName: 'תאריך',
            flex: 1,
            renderCell: (params) =>
                params.value
                    ? new Date(params.value).toLocaleString('he-IL', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        // hour: '2-digit',
                        // minute: '2-digit'
                    })
                    : 'אין תאריך',
        },
        {
            field: 'img',
            headerName: 'תמונה',
            flex: 1,
            renderCell: (params) =>
                params.value ? (
                    <img src={params.value} alt="img" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                ) : (
                    'אין תמונה'
                ),
        },
        {
            field: 'actions',
            headerName: 'פעולות',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary"
                        onClick={() => tab === 0 && handleEditOpen(params.row)}
                        disabled={tab === 1}
                    >
                        <EditIcon sx={{
                            color: 'brown',
                            opacity: tab === 1 ? 0.5 : 1,
                            textDecoration: tab === 1 ? 'line-through' : 'none',
                            '&:active': { color: '#3B6B7F' }
                        }} />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => tab === 0 && deleteRow(params.id)}
                        disabled={tab === 1}
                    >
                        <DeleteIcon sx={{
                            color: 'brown',
                            opacity: tab === 1 ? 0.5 : 1,
                            textDecoration: tab === 1 ? 'line-through' : 'none',
                            '&:active': { color: '#3B6B7F' }
                        }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    // פונקציה שמפרידה את השורות לעבר והווה
    function splitRowsByDate(rows) {
        const now = new Date();
        const past = [];
        const future = [];
        rows.forEach((row) => {
            const rowDate = new Date(row.date);
            if (rowDate < now) {
                past.push(row);
            } else {
                future.push(row);
            }
        });
        // אפשר למיין כל קבוצה לפי תאריך
        past.sort((a, b) => new Date(b.date) - new Date(a.date));
        future.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { past, future };
    }
    const deleteRow = async (id) => {

        try {
            const res = await dispatch(delRealization(id)).unwrap()
            switch (res.status) {
                case 204:
                    dispatch(getRealizations(user.data))
                    break;
                case 404:
                    console.log("not found");
                    break;
            }
        }
        catch (err) {
            throw err
        }
    }

    // פותח דיאלוג עריכה
    const handleEditOpen = (row) => {
        setEditRow(row);
        setEditDate(row.date);
        setEditNotes(row.Notes || '');
        setEditOpen(true);
    };

    // סוגר דיאלוג עריכה
    const handleEditClose = () => {
        setEditOpen(false);
        setEditRow(null);
    };

    // שמירת עריכה
    const handleEditSave = async () => {
        try {
            const updated = { ...editRow, date: editDate, notes: editNotes };
            // כאן תוכל לעדכן ב-Redux (להוסיף thunk לעדכון)
            const res = await dispatch(updateRealization(updated)).unwrap()

            switch (res.status) {
                case 201:
                    // רענון הנתונים מהשרת
                    dispatch(getRealizations(user.data));
                    handleEditClose();
                    // navigate('/Realization')
                    break;
                case 404:
                    console.log("not found");
                    break;
            }
        }
        catch (err) {
            throw err
        }
    };

    // פונקציה לחסימת ימים (רק יום רביעי מותר)
    const isWednesday = (date) => date.day() === 3;


    return (
        <Box sx={{ width: '100%', direction: 'rtl', position: 'relative', pb: 8 }}>
            {/* <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: 'brown', textAlign: 'center' }}>
                הפרסומים שלי
            </Typography> */}
            <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{
                '& .MuiTabs-indicator': {
                    backgroundColor: 'brown',
                }
            }}>
                <Tab label=" פרסומים עתידיים" sx={{ '&.Mui-selected': { color: 'brown' } }} />
                <Tab label=" פרסומים קודמים" sx={{ '&.Mui-selected': { color: 'brown' } }} />
            </Tabs>
            <Box sx={{ mt: 2 }}>
                {tab === 0 && (
                    <>
                        <Typography variant="h6" sx={{ mb: 1 }}>פרסומים עתידיים</Typography>
                        {future.length > 0 ? <DataGrid

                            rows={future}
                            columns={columns}
                            pageSize={5}
                            disableRowSelectionOnClick
                            autoHeight
                            getRowId={(row) => row.id}
                            localeText={{ noRowsLabel: 'אין נתונים' }}
                        /> : <Typography variant="body1" sx={{ color: 'grey.500' }}>אין נתונים</Typography>}
                    </>
                )}
                {tab === 1 && (
                    <>
                        <Typography variant="h6" sx={{ mb: 1 }}>פרסומים קודמים</Typography>
                        {past.length > 0 ? <DataGrid
                            rows={past}
                            columns={columns}
                            pageSize={5}
                            disableRowSelectionOnClick
                            autoHeight
                            getRowId={(row) => row.id}
                            localeText={{ noRowsLabel: 'אין נתונים' }}
                        /> : <Typography variant="body1" sx={{ color: 'grey.500' }}>אין נתונים</Typography>}
                    </>
                )}
            </Box>
            <Tooltip title="פרסום חדש" placement="left" >
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        position: 'absolute',
                        // marginTop: "8px",
                        bottom: 16,
                        right: 16, // לפינה הימנית התחתונה. אפשר לשנות ל-left: 16 אם רוצים שמאלה
                        zIndex: 100,
                        backgroundColor: '#3B6B7F',
                        ":hover": {
                            backgroundColor: 'brown',
                        }
                    }}
                    onClick={() => navigate('/ActiveRental')}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

            {/* דיאלוג עריכה */}
            <Dialog open={editOpen} onClose={handleEditClose} sx={{ direction: 'rtl' }}>
                <DialogTitle>עריכת השכרה</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="תאריך"
                            format="DD/MM/YYYY"
                            value={dayjs(editDate)}
                            shouldDisableDate={(date) => !isWednesday(date)}
                            views={['year', 'month', 'day']}
                            disablePast={true}
                            onChange={(newValue) => setEditDate(newValue)}
                            sx={{ my: 1, width: '100%' }}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="הערות"
                        value={editNotes}
                        onChange={e => setEditNotes(e.target.value)}
                        fullWidth
                        sx={{ my: 1 }}
                    />
                    {/* הוספת העלאת תמונה */}
                    <Box sx={{ my: 2 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{
                                mr: 2, color: '#3682A1', minWidth: 0, p: 1, border: 'none'
                            }}
                        >
                            <FolderOpenIcon sx={{ fontSize: 32, color: '#3682A1' }} />
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setEditRow(prev => ({ ...prev, img: reader.result }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </Button>
                        {/* תצוגה מקדימה */}
                        {editRow?.img && (
                            <img src={editRow.img} alt="img" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} sx={{ color: '#3682A1' }}>ביטול</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary" sx={{
                        backgroundColor: '#3682A1',
                        color: '#fff',
                        ':hover': {
                            backgroundColor: '#276080',
                        },
                    }}>שמור</Button>
                </DialogActions>
            </Dialog>
            
        </Box>
    );
}