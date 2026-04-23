import { useState } from 'react';
import { Save, Bell, DollarSign, Shield, User, Palette, Star, Zap, Check } from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoSelect } from '@/components/ui/NeoSelect';
import { cn } from '@/lib/utils';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    organizationName: 'Eventify Inc.',
    defaultCurrency: 'USD',
    timezone: 'UTC-5',
    language: 'en',
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    publicProfile: true,
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'INR', label: 'INR (₹)' },
  ];

  const timezoneOptions = [
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC+0', label: 'GMT (UTC+0)' },
    { value: 'UTC+1', label: 'Central European (UTC+1)' },
    { value: 'UTC+5:30', label: 'India (UTC+5:30)' },
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'hi', label: 'Hindi' },
  ];

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    label 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void; 
    label: string;
  }) => (
    <div className="flex items-center justify-between p-4 bg-white border-4 border-black">
      <span className="font-bold">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'w-14 h-8 border-4 border-black transition-all relative',
          checked ? 'bg-[#FFD93D]' : 'bg-gray-200'
        )}
      >
        <div className={cn(
          'absolute top-0.5 w-5 h-5 bg-white border-2 border-black transition-all',
          checked ? 'left-6' : 'left-0.5'
        )} />
      </button>
    </div>
  );

  return (
    <div className="neo-page p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 relative">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight">
            Settings
          </h1>
          <NeoBadge variant="secondary" rotation={-2}>
            <Zap className="w-4 h-4 mr-1" />
            Pro
          </NeoBadge>
        </div>
        <p className="text-lg font-medium text-black/60">
          Customize your platform preferences.
        </p>
        <Star className="absolute top-0 right-4 w-8 h-8 text-[#FFD93D] rotate-12 hidden lg:block" />
      </div>

      {/* Saved Message */}
      {savedMessage && (
        <div className="mb-6 p-4 bg-green-400 border-4 border-black shadow-[6px_6px_0px_#000] flex items-center gap-3 animate-bounce-slight">
          <Check className="w-6 h-6" />
          <span className="font-bold">Settings saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <NeoCard hover={false} className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-wider transition-all border-4',
                    activeTab === tab.id
                      ? 'bg-[#FF6B6B] border-black shadow-[4px_4px_0px_#000] -translate-x-1 -translate-y-1'
                      : 'border-transparent hover:border-black hover:shadow-[4px_4px_0px_#000] hover:-translate-x-1 hover:-translate-y-1'
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </NeoCard>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <NeoCard>
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#FF6B6B] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase">General Settings</h2>
                    <p className="text-black/60">Manage your organization details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <NeoInput
                    label="Organization Name"
                    value={settings.organizationName}
                    onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NeoSelect
                      label="Default Currency"
                      value={settings.defaultCurrency}
                      onChange={(e) => setSettings({ ...settings, defaultCurrency: e.target.value })}
                      options={currencyOptions}
                    />
                    <NeoSelect
                      label="Timezone"
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      options={timezoneOptions}
                    />
                  </div>
                  
                  <NeoSelect
                    label="Language"
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    options={languageOptions}
                  />
                </div>

                <div className="p-4 bg-[#FFD93D] border-4 border-black shadow-[4px_4px_0px_#000]">
                  <p className="font-bold uppercase text-sm mb-1">Organization ID</p>
                  <p className="font-mono text-lg">ORG-2026-EVENTIFY-7842</p>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#FFD93D] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase">Notifications</h2>
                    <p className="text-black/60">Choose how you want to be notified</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <ToggleSwitch
                    label="Email Notifications"
                    checked={settings.emailNotifications}
                    onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                  <ToggleSwitch
                    label="Push Notifications"
                    checked={settings.pushNotifications}
                    onChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                  />
                  <ToggleSwitch
                    label="Marketing Emails"
                    checked={settings.marketingEmails}
                    onChange={(checked) => setSettings({ ...settings, marketingEmails: checked })}
                  />
                </div>

                <div className="p-4 bg-[#FFFDF5] border-4 border-black">
                  <p className="font-bold uppercase text-sm mb-2">Notification Preview</p>
                  <div className="space-y-2">
                    <div className="p-3 bg-white border-2 border-black flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF6B6B] border-2 border-black flex items-center justify-center">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">New attendee registered</p>
                        <p className="text-xs text-black/60">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C4B5FD] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase">Billing</h2>
                    <p className="text-black/60">Manage your subscription and payments</p>
                  </div>
                </div>

                <div className="p-6 bg-[#FFD93D] border-4 border-black shadow-[6px_6px_0px_#000]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold uppercase text-sm">Current Plan</p>
                      <p className="text-3xl font-black">Pro Plan</p>
                    </div>
                    <NeoBadge variant="primary" rotation={2}>Active</NeoBadge>
                  </div>
                  <p className="text-lg font-bold">$49/month</p>
                  <p className="text-sm text-black/60">Next billing date: July 15, 2026</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-black uppercase">Plan Features</h3>
                  {[
                    'Unlimited events',
                    '10,000 attendees/month',
                    'Advanced analytics',
                    'Priority support',
                    'Custom branding',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white border-4 border-black">
                      <div className="w-6 h-6 bg-green-400 border-2 border-black flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-bold">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <NeoButton variant="secondary">Upgrade Plan</NeoButton>
                  <NeoButton variant="muted">View Invoices</NeoButton>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#FF6B6B] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase">Security</h2>
                    <p className="text-black/60">Protect your account</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <ToggleSwitch
                    label="Two-Factor Authentication"
                    checked={settings.twoFactorAuth}
                    onChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                  />
                  <ToggleSwitch
                    label="Public Profile"
                    checked={settings.publicProfile}
                    onChange={(checked) => setSettings({ ...settings, publicProfile: checked })}
                  />
                </div>

                <div className="p-4 bg-[#FFFDF5] border-4 border-black">
                  <p className="font-bold uppercase text-sm mb-3">Change Password</p>
                  <div className="space-y-3">
                    <NeoInput type="password" placeholder="Current password" />
                    <NeoInput type="password" placeholder="New password" />
                    <NeoInput type="password" placeholder="Confirm new password" />
                    <NeoButton size="sm">Update Password</NeoButton>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border-4 border-red-400">
                  <p className="font-bold uppercase text-sm text-red-600 mb-2">Danger Zone</p>
                  <p className="text-sm text-red-600 mb-3">These actions cannot be undone.</p>
                  <NeoButton variant="danger" size="sm">Delete Account</NeoButton>
                </div>
              </div>
            )}

            {/* Appearance */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C4B5FD] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase">Appearance</h2>
                    <p className="text-black/60">Customize the look and feel</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold uppercase text-sm mb-3">Theme Colors</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-[#FF6B6B] border-4 border-black text-center shadow-[4px_4px_0px_#000] cursor-pointer hover:-translate-y-1 transition-transform">
                      <p className="font-black uppercase">Coral</p>
                      <p className="text-xs font-mono">#FF6B6B</p>
                    </div>
                    <div className="p-4 bg-[#FFD93D] border-4 border-black text-center shadow-[4px_4px_0px_#000] cursor-pointer hover:-translate-y-1 transition-transform">
                      <p className="font-black uppercase">Yellow</p>
                      <p className="text-xs font-mono">#FFD93D</p>
                    </div>
                    <div className="p-4 bg-[#C4B5FD] border-4 border-black text-center shadow-[4px_4px_0px_#000] cursor-pointer hover:-translate-y-1 transition-transform">
                      <p className="font-black uppercase">Purple</p>
                      <p className="text-xs font-mono">#C4B5FD</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-bold uppercase text-sm mb-3">Preview</p>
                  <div className="p-6 bg-[#FFFDF5] border-4 border-black">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#FF6B6B] border-4 border-black" />
                      <div className="w-10 h-10 bg-[#FFD93D] border-4 border-black" />
                      <div className="w-10 h-10 bg-[#C4B5FD] border-4 border-black" />
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#FF6B6B] border-4 border-black font-bold uppercase text-sm shadow-[4px_4px_0px_#000]">
                        Primary
                      </button>
                      <button className="px-4 py-2 bg-[#FFD93D] border-4 border-black font-bold uppercase text-sm shadow-[4px_4px_0px_#000]">
                        Secondary
                      </button>
                      <button className="px-4 py-2 bg-[#C4B5FD] border-4 border-black font-bold uppercase text-sm shadow-[4px_4px_0px_#000]">
                        Muted
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FFFDF5] border-4 border-black">
                  <p className="font-bold uppercase text-sm mb-2">Neo-Brutalist Mode</p>
                  <p className="text-sm text-black/60 mb-3">
                    Bold borders, hard shadows, and vibrant colors. This is the signature Eventify look.
                  </p>
                  <NeoBadge variant="secondary">Currently Active</NeoBadge>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t-4 border-black">
              <NeoButton onClick={handleSave}>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </NeoButton>
            </div>
          </NeoCard>
        </div>
      </div>
    </div>
  );
};