import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Visibility as VisibilityIcon 
} from '@mui/icons-material';
import axios from 'axios';

const ManageArtists = () => {
  const [artists, setArtists] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  // Fetch artists from API
  const fetchArtists = async () => {
    try {
      const response = await axios.get('/api/artists', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
      // TODO: Implement error handling (e.g., show error message)
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  // Handle artist update
  const handleUpdateArtist = async () => {
    try {
      await axios.put(`/api/artists/${selectedArtist.id}`, selectedArtist, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchArtists();
      setOpenUpdateDialog(false);
    } catch (error) {
      console.error('Error updating artist:', error);
      // TODO: Implement error handling
    }
  };

  // Handle artist deletion
  const handleDeleteArtist = async (artistId) => {
    try {
      await axios.delete(`/api/artists/${artistId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchArtists();
    } catch (error) {
      console.error('Error deleting artist:', error);
      // TODO: Implement error handling
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Artists</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artists.map((artist) => (
              <TableRow key={artist.id}>
                <TableCell>{artist.id}</TableCell>
                <TableCell>{artist.username}</TableCell>
                <TableCell>{artist.email}</TableCell>
                <TableCell>{new Date(artist.registrationDate).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Artist">
                    <IconButton 
                      onClick={() => {
                        setSelectedArtist(artist);
                        setOpenUpdateDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Artist">
                    <IconButton 
                      onClick={() => handleDeleteArtist(artist.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Artist Dialog */}
      <Dialog 
        open={openUpdateDialog} 
        onClose={() => setOpenUpdateDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Artist</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={selectedArtist?.username || ''}
            onChange={(e) => setSelectedArtist(prev => ({
              ...prev, 
              username: e.target.value
            }))}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={selectedArtist?.email || ''}
            onChange={(e) => setSelectedArtist(prev => ({
              ...prev, 
              email: e.target.value
            }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleUpdateArtist} 
            color="primary" 
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageArtists;