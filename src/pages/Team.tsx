import { useState } from 'react';
import { Plus, Mail, Shield, UserCheck, UserX, Star, Users, Crown, Wrench, HeartHandshake } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoModal } from '@/components/ui/NeoModal';
import { NeoSelect } from '@/components/ui/NeoSelect';
import { getUsers, type User } from '@/lib/data';
import { cn } from '@/lib/utils';

export const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>(getUsers());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Volunteer',
    department: '',
  });

  const handleAddMember = () => {
    const newMember: User = {
      _id: `usr${String(teamMembers.length + 1).padStart(3, '0')}`,
      name: formData.name,
      email: formData.email,
      role: formData.role as any,
      avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      department: formData.department,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      permissions: formData.role === 'Organizer' ? ['all'] : 
                   formData.role === 'Staff' ? ['events', 'attendees'] : ['checkin'],
    };
    setTeamMembers([...teamMembers, newMember]);
    setIsAddModalOpen(false);
    setFormData({ name: '', email: '', role: 'Volunteer', department: '' });
  };

  const handleDelete = () => {
    if (!selectedMember) return;
    setTeamMembers(teamMembers.filter(m => m._id !== selectedMember._id));
    setIsDeleteModalOpen(false);
    setSelectedMember(null);
  };

  const openDeleteModal = (member: User) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Organizer':
        return <Crown className="w-5 h-5" />;
      case 'Staff':
        return <Wrench className="w-5 h-5" />;
      case 'Volunteer':
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const roleOptions = [
    { value: 'Organizer', label: 'Organizer' },
    { value: 'Staff', label: 'Staff' },
    { value: 'Volunteer', label: 'Volunteer' },
  ];

  const organizers = teamMembers.filter(m => m.role === 'Organizer');
  const staff = teamMembers.filter(m => m.role === 'Staff');
  const volunteers = teamMembers.filter(m => m.role === 'Volunteer');

  return (
    <div className="neo-page p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Team
          </h1>
          <NeoBadge variant="muted" rotation={-2}>{teamMembers.length} Members</NeoBadge>
        </div>
        <p className="text-lg font-medium text-black/60">
          Manage your event team and assign roles.
        </p>
        <Star className="absolute top-0 right-4 w-8 h-8 text-[#FFD93D] rotate-12 hidden lg:block" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <NeoCard hover={false} className="p-4 text-center">
          <div className="w-12 h-12 bg-[#FF6B6B] border-4 border-black mx-auto mb-2 flex items-center justify-center shadow-[4px_4px_0px_#000]">
            <Crown className="w-6 h-6" />
          </div>
          <p className="text-2xl font-black">{organizers.length}</p>
          <p className="text-xs uppercase font-bold text-black/60">Organizers</p>
        </NeoCard>
        <NeoCard hover={false} className="p-4 text-center">
          <div className="w-12 h-12 bg-[#FFD93D] border-4 border-black mx-auto mb-2 flex items-center justify-center shadow-[4px_4px_0px_#000]">
            <Wrench className="w-6 h-6" />
          </div>
          <p className="text-2xl font-black">{staff.length}</p>
          <p className="text-xs uppercase font-bold text-black/60">Staff</p>
        </NeoCard>
        <NeoCard hover={false} className="p-4 text-center">
          <div className="w-12 h-12 bg-[#C4B5FD] border-4 border-black mx-auto mb-2 flex items-center justify-center shadow-[4px_4px_0px_#000]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <p className="text-2xl font-black">{volunteers.length}</p>
          <p className="text-xs uppercase font-bold text-black/60">Volunteers</p>
        </NeoCard>
      </div>

      {/* Add Member Button */}
      <div className="mb-6">
        <NeoButton onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Team Member
        </NeoButton>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Organizers Section */}
        <div className="md:col-span-2 xl:col-span-3">
          <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#FF6B6B]" />
            Organizers
          </h2>
        </div>
        {organizers.map((member, index) => (
          <NeoCard 
            key={member._id}
            rotation={index % 2 === 0 ? 1 : -1}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-[#FF6B6B] border-4 border-black flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_#000]">
                {member.avatar}
              </div>
              <NeoBadge variant="primary" rotation={2}>
                {getRoleIcon(member.role)}
                <span className="ml-1">{member.role}</span>
              </NeoBadge>
            </div>
            <h3 className="text-xl font-black mb-1">{member.name}</h3>
            <p className="text-sm text-black/60 flex items-center gap-1 mb-2">
              <Mail className="w-4 h-4" />
              {member.email}
            </p>
            <p className="text-sm font-medium mb-4">{member.department}</p>
            <div className="flex items-center justify-between pt-4 border-t-4 border-black">
              <span className={cn(
                'px-2 py-1 text-xs font-bold uppercase border-2 border-black',
                member.status === 'active' ? 'bg-green-400' : 'bg-red-400'
              )}>
                {member.status}
              </span>
              <button
                onClick={() => openDeleteModal(member)}
                className="p-2 text-red-600 hover:bg-red-100 border-2 border-transparent hover:border-red-600 transition-all"
              >
                <UserX className="w-4 h-4" />
              </button>
            </div>
          </NeoCard>
        ))}

        {/* Staff Section */}
        <div className="md:col-span-2 xl:col-span-3 mt-4">
          <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-[#FFD93D]" />
            Staff
          </h2>
        </div>
        {staff.map((member, index) => (
          <NeoCard 
            key={member._id}
            rotation={index % 2 === 0 ? -1 : 1}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-[#FFD93D] border-4 border-black flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_#000]">
                {member.avatar}
              </div>
              <NeoBadge variant="secondary" rotation={-2}>
                {getRoleIcon(member.role)}
                <span className="ml-1">{member.role}</span>
              </NeoBadge>
            </div>
            <h3 className="text-xl font-black mb-1">{member.name}</h3>
            <p className="text-sm text-black/60 flex items-center gap-1 mb-2">
              <Mail className="w-4 h-4" />
              {member.email}
            </p>
            <p className="text-sm font-medium mb-4">{member.department}</p>
            <div className="flex items-center justify-between pt-4 border-t-4 border-black">
              <span className={cn(
                'px-2 py-1 text-xs font-bold uppercase border-2 border-black',
                member.status === 'active' ? 'bg-green-400' : 'bg-red-400'
              )}>
                {member.status}
              </span>
              <button
                onClick={() => openDeleteModal(member)}
                className="p-2 text-red-600 hover:bg-red-100 border-2 border-transparent hover:border-red-600 transition-all"
              >
                <UserX className="w-4 h-4" />
              </button>
            </div>
          </NeoCard>
        ))}

        {/* Volunteers Section */}
        <div className="md:col-span-2 xl:col-span-3 mt-4">
          <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-[#C4B5FD]" />
            Volunteers
          </h2>
        </div>
        {volunteers.map((member, index) => (
          <NeoCard 
            key={member._id}
            rotation={index % 2 === 0 ? 1 : -1}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-[#C4B5FD] border-4 border-black flex items-center justify-center text-2xl font-black shadow-[4px_4px_0px_#000]">
                {member.avatar}
              </div>
              <NeoBadge variant="muted" rotation={2}>
                {getRoleIcon(member.role)}
                <span className="ml-1">{member.role}</span>
              </NeoBadge>
            </div>
            <h3 className="text-xl font-black mb-1">{member.name}</h3>
            <p className="text-sm text-black/60 flex items-center gap-1 mb-2">
              <Mail className="w-4 h-4" />
              {member.email}
            </p>
            <p className="text-sm font-medium mb-4">{member.department}</p>
            <div className="flex items-center justify-between pt-4 border-t-4 border-black">
              <span className={cn(
                'px-2 py-1 text-xs font-bold uppercase border-2 border-black',
                member.status === 'active' ? 'bg-green-400' : 'bg-red-400'
              )}>
                {member.status}
              </span>
              <button
                onClick={() => openDeleteModal(member)}
                className="p-2 text-red-600 hover:bg-red-100 border-2 border-transparent hover:border-red-600 transition-all"
              >
                <UserX className="w-4 h-4" />
              </button>
            </div>
          </NeoCard>
        ))}
      </div>

      {/* Add Member Modal */}
      <NeoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Team Member"
        footer={
          <>
            <NeoButton variant="muted" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </NeoButton>
            <NeoButton onClick={handleAddMember}>
              Add Member
            </NeoButton>
          </>
        }
      >
        <div className="space-y-4">
          <NeoInput
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
          />
          <NeoInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
          />
          <NeoSelect
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={roleOptions}
          />
          <NeoInput
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="e.g., Marketing, Operations"
          />
          
          {/* Role Info */}
          <div className="p-4 bg-[#FFFDF5] border-4 border-black">
            <p className="font-bold uppercase text-sm mb-2">Role Permissions</p>
            {formData.role === 'Organizer' && (
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Full access to all features</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Manage team members</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Financial controls</li>
              </ul>
            )}
            {formData.role === 'Staff' && (
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Manage events & attendees</li>
                <li className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> View analytics</li>
                <li className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> Limited settings access</li>
              </ul>
            )}
            {formData.role === 'Volunteer' && (
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> Check-in attendees</li>
                <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> View attendee info</li>
                <li className="flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> No edit permissions</li>
              </ul>
            )}
          </div>
        </div>
      </NeoModal>

      {/* Delete Modal */}
      <NeoModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Remove Team Member"
        footer={
          <>
            <NeoButton variant="muted" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </NeoButton>
            <NeoButton variant="danger" onClick={handleDelete}>
              Remove
            </NeoButton>
          </>
        }
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-400 border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-[6px_6px_0px_#000]">
            <UserX className="w-8 h-8" />
          </div>
          <p className="text-lg font-bold mb-2">Remove team member?</p>
          <p className="text-black/60">
            This will remove <span className="font-bold text-black">{selectedMember?.name}</span> from the team.
            They will lose all access permissions.
          </p>
        </div>
      </NeoModal>
    </div>
  );
};