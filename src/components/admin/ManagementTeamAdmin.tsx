import React, { useState } from 'react'
import { useManagementTeam } from '@/hooks/useManagementTeam'
import { ManagementTeamMember } from '@/lib/supabase'
import { uploadHistoryImage } from '@/lib/imageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, Users, Upload, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const ManagementTeamAdmin: React.FC = () => {
  const { members, loading, createMember, updateMember, deleteMember } = useManagementTeam()
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState<ManagementTeamMember | null>(null)
  const [memberImageFile, setMemberImageFile] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    experience: '',
    order_index: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let imageUrl = ''

      // Upload image if a new file is selected
      if (memberImageFile) {
        setUploadingImage(true)
        imageUrl = await uploadHistoryImage(memberImageFile)
        setUploadingImage(false)
      } else if (editingMember?.image_url) {
        imageUrl = editingMember.image_url
      }

      if (editingMember) {
        await updateMember(editingMember.id, {
          name: formData.name,
          role: formData.role,
          experience: formData.experience || undefined,
          image_url: imageUrl || undefined,
          order_index: formData.order_index
        })
      } else {
        await createMember({
          name: formData.name,
          role: formData.role,
          experience: formData.experience || undefined,
          image_url: imageUrl || undefined,
          order_index: formData.order_index
        })
      }
      resetForm()
    } catch (error) {
      console.error('Error saving management team member:', error)
      setUploadingImage(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', role: '', experience: '', order_index: 0 })
    setMemberImageFile(null)
    setEditingMember(null)
    setShowForm(false)
    setUploadingImage(false)
  }

  const handleEditMember = (member: ManagementTeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      experience: member.experience || '',
      order_index: member.order_index
    })
    setMemberImageFile(null)
    setShowForm(true)
  }

  const handleDeleteMember = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await deleteMember(id)
      } catch (error) {
        console.error('Error deleting team member:', error)
      }
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading management team data...</div>
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Management Team</h2>
        <Button onClick={() => setShowForm(true)} className="bg-secondary hover:bg-secondary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g., John Doe"
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                    placeholder="e.g., Chief Technology Officer"
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g., (ex. Google, Microsoft, Amazon)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="order_index">Display Order</Label>
                  <Input
                    id="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <Label htmlFor="member_image">Profile Image</Label>
                  <div className="space-y-2">
                    <input
                      id="member_image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setMemberImageFile(file)
                        }
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="member_image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-secondary transition-colors"
                    >
                      {memberImageFile ? (
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 mx-auto mb-2 text-secondary" />
                          <p className="text-sm text-secondary">{memberImageFile.name}</p>
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
                  {editingMember && editingMember.image_url && !memberImageFile && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Current image:</p>
                      <img
                        src={editingMember.image_url}
                        alt="Current member image"
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
                    {uploadingImage ? 'Uploading...' : (editingMember ? 'Update Member' : 'Add Member')}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Members List */}
      <div className="space-y-6">
        {members.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Team Members</h3>
            <p className="text-muted-foreground">Add your first team member to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members
              .sort((a, b) => a.order_index - b.order_index)
              .map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop&crop=center';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Users className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Order: {member.order_index}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditMember(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteMember(member.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground">Role</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                    {member.experience && (
                      <div>
                        <h4 className="font-semibold text-foreground">Experience</h4>
                        <p className="text-sm text-muted-foreground">{member.experience}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManagementTeamAdmin

