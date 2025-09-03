import React, { useState } from 'react'
import { useHistory } from '@/hooks/useHistory'
import { HistoryYear, HistoryEvent } from '@/lib/supabase'
import { uploadHistoryImage } from '@/lib/imageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, Calendar, Image as ImageIcon, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

const HistoryAdmin: React.FC = () => {
  const { years, loading, createYear, updateYear, deleteYear, createEvent, updateEvent, deleteEvent } = useHistory()
  const [showYearForm, setShowYearForm] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingYear, setEditingYear] = useState<HistoryYear | null>(null)
  const [editingEvent, setEditingEvent] = useState<HistoryEvent | null>(null)
  const [selectedYearId, setSelectedYearId] = useState<string>('')

  const [yearForm, setYearForm] = useState({
    year: '',
    image_url: ''
  })
  const [yearImageFile, setYearImageFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [eventForm, setEventForm] = useState({
    month: '',
    title: '',
    description: '',
    order_index: 0
  })

  const handleYearSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let imageUrl = yearForm.image_url

      // Upload image if a new file is selected
      if (yearImageFile) {
        setUploadingImage(true)
        imageUrl = await uploadHistoryImage(yearImageFile)
        setUploadingImage(false)
      }

      if (editingYear) {
        await updateYear(editingYear.id, {
          year: parseInt(yearForm.year),
          title: `${yearForm.year} Milestone`,
          image_url: imageUrl || undefined
        })
      } else {
        await createYear({
          year: parseInt(yearForm.year),
          title: `${yearForm.year} Milestone`,
          image_url: imageUrl || undefined
        })
      }
      resetYearForm()
    } catch (error) {
      console.error('Error saving year:', error)
      setUploadingImage(false)
    }
  }

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedYearId) return

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventForm)
      } else {
        await createEvent({
          year_id: selectedYearId,
          month: eventForm.month,
          title: eventForm.title,
          description: eventForm.description,
          order_index: eventForm.order_index
        })
      }
      resetEventForm()
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const resetYearForm = () => {
    setYearForm({ year: '', image_url: '' })
    setYearImageFile(null)
    setEditingYear(null)
    setShowYearForm(false)
    setUploadingImage(false)
  }

  const resetEventForm = () => {
    setEventForm({ month: '', title: '', description: '', order_index: 0 })
    setEditingEvent(null)
    setShowEventForm(false)
    setSelectedYearId('')
  }

  const handleEditYear = (year: HistoryYear) => {
    setEditingYear(year)
    setYearForm({
      year: year.year.toString(),
      image_url: year.image_url || ''
    })
    setYearImageFile(null)
    setShowYearForm(true)
  }

  const handleEditEvent = (event: HistoryEvent) => {
    setEditingEvent(event)
    setEventForm({
      month: event.month,
      title: event.title,
      description: event.description,
      order_index: event.order_index
    })
    setSelectedYearId(event.year_id)
    setShowEventForm(true)
  }

  const handleDeleteYear = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this year? This will also delete all associated events.')) {
      try {
        await deleteYear(id)
      } catch (error) {
        console.error('Error deleting year:', error)
      }
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id)
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading history data...</div>
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">History Management</h2>
        <Button onClick={() => setShowYearForm(true)} className="bg-secondary hover:bg-secondary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Year
        </Button>
      </div>

      {/* Year Form Modal */}
      {showYearForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingYear ? 'Edit Year' : 'Add New Year'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleYearSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={yearForm.year}
                    onChange={(e) => setYearForm({ ...yearForm, year: e.target.value })}
                    required
                    placeholder="e.g., 2026"
                  />
                </div>
                
                <div>
                  <Label htmlFor="year_image">Year Image</Label>
                  <div className="space-y-2">
                    <input
                      id="year_image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setYearImageFile(file)
                          setYearForm({ ...yearForm, image_url: '' }) // Clear URL when file is selected
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="year_image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-secondary transition-colors"
                    >
                      {yearImageFile ? (
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-secondary" />
                          <p className="text-sm text-secondary">{yearImageFile.name}</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Click to upload image</p>
                        </div>
                      )}
                    </label>
                  </div>
                  
                  {/* Show current image if editing and no new file selected */}
                  {editingYear && yearForm.image_url && !yearImageFile && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Current image:</p>
                      <img
                        src={yearForm.image_url}
                        alt="Current year image"
                        className="w-32 h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop&crop=center';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    type="submit" 
                    className="bg-secondary hover:bg-secondary/90"
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? 'Uploading...' : (editingYear ? 'Update Year' : 'Create Year')}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetYearForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="year_select">Year</Label>
                  <select
                    id="year_select"
                    value={selectedYearId}
                    onChange={(e) => setSelectedYearId(e.target.value)}
                    required
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="">Select a year</option>
                    {years.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="month">Month</Label>
                  <Input
                    id="month"
                    value={eventForm.month}
                    onChange={(e) => setEventForm({ ...eventForm, month: e.target.value })}
                    required
                    placeholder="e.g., January"
                  />
                </div>
                <div>
                  <Label htmlFor="event_title">Event Title</Label>
                  <Input
                    id="event_title"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    required
                    placeholder="e.g., New Product Launch"
                  />
                </div>
                <div>
                  <Label htmlFor="event_description">Description</Label>
                  <Textarea
                    id="event_description"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    required
                    placeholder="Event description"
                  />
                </div>
                <div>
                  <Label htmlFor="order_index">Order Index</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={eventForm.order_index}
                    onChange={(e) => setEventForm({ ...eventForm, order_index: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="bg-secondary hover:bg-secondary/90">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetEventForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Years List */}
      <div className="space-y-6">
        {years.map((year) => (
          <Card key={year.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-secondary" />
                  <div>
                    <CardTitle className="text-2xl">{year.year}</CardTitle>
                    <p className="text-muted-foreground">{year.title}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedYearId(year.id)
                      setShowEventForm(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Event
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditYear(year)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteYear(year.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {year.description && (
                <p className="text-muted-foreground mb-4">{year.description}</p>
              )}
              {year.image_url && (
                <div className="mb-4">
                  <img
                    src={year.image_url}
                    alt={`${year.year} image`}
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop&crop=center';
                    }}
                  />
                </div>
              )}
              
              {/* Events List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Events ({year.events.length})</h4>
                {year.events
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((event) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{event.month} - {event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.description}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditEvent(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {year.events.length === 0 && (
                  <p className="text-muted-foreground text-sm">No events added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HistoryAdmin
