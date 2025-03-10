"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useSettings } from "@/contexts/settings-context"
import { toast } from "sonner"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings, updateNotificationSettings, updatePrivacySettings } = useSettings()

  const handleSaveAccount = () => {
    updateSettings({
      fullName: settings.fullName,
      email: settings.email,
      phone: settings.phone,
      timezone: settings.timezone,
    })
    toast.success("Account settings saved successfully")
  }

  const handleSaveNotifications = () => {
    updateNotificationSettings(settings.notifications)
    toast.success("Notification settings saved successfully")
  }

  const handleSavePrivacy = () => {
    updatePrivacySettings(settings.privacy)
    toast.success("Privacy settings saved successfully")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    value={settings.fullName}
                    onChange={(e) => updateSettings({ fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSettings({ email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => updateSettings({ phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => updateSettings({ timezone: value })}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select Timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc+0">Greenwich Mean Time (UTC+0)</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                      <SelectItem value="utc+9">Japan Standard Time (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveAccount}>Save Account Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your dashboard experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="zh">中文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mm-dd-yyyy">
                      <SelectTrigger id="date-format">
                        <SelectValue placeholder="Select Date Format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="dark-mode" />
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Dashboard Layout</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="layout">
                      <SelectValue placeholder="Select Layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="expanded">Expanded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Notification Channels</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="email-notifications"
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) =>
                          updateNotificationSettings({ ...settings.notifications, email: !!checked })
                        }
                      />
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="push-notifications"
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) =>
                          updateNotificationSettings({ ...settings.notifications, push: !!checked })
                        }
                      />
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sms-notifications"
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) =>
                          updateNotificationSettings({ ...settings.notifications, sms: !!checked })
                        }
                      />
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notification Types</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="account-activity"
                        checked={settings.notifications.accountActivity}
                        onCheckedChange={(checked) =>
                          updateNotificationSettings({ ...settings.notifications, accountActivity: !!checked })
                        }
                      />
                      <Label htmlFor="account-activity">Account Activity</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new-features"
                        checked={settings.notifications.newFeatures}
                        onCheckedChange={(checked) =>
                          updateNotificationSettings({ ...settings.notifications, newFeatures: !!checked })
                        }
                      />
                      <Label htmlFor="new-features">New Features and Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={settings.notifications.marketing}
                        onCheckedChange={(checked) =>
                          updateNotificationSettings({ ...settings.notifications, marketing: !!checked })
                        }
                      />
                      <Label htmlFor="marketing">Marketing and Promotions</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Notification Frequency</Label>
                  <Select
                    value={settings.notifications.frequency}
                    onValueChange={(value) =>
                      updateNotificationSettings({ ...settings.notifications, frequency: value })
                    }
                  >
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your privacy and data settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Data Sharing</Label>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="analytics-sharing">Share analytics data</Label>
                    <Switch
                      id="analytics-sharing"
                      checked={settings.privacy.analyticsSharing}
                      onCheckedChange={(checked) =>
                        updatePrivacySettings({ ...settings.privacy, analyticsSharing: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="personalized-ads">Allow personalized ads</Label>
                    <Switch
                      id="personalized-ads"
                      checked={settings.privacy.personalizedAds}
                      onCheckedChange={(checked) =>
                        updatePrivacySettings({ ...settings.privacy, personalizedAds: checked })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Account Visibility</Label>
                  <Select
                    value={settings.privacy.visibility}
                    onValueChange={(value) => updatePrivacySettings({ ...settings.privacy, visibility: value })}
                  >
                    <SelectTrigger id="visibility">
                      <SelectValue placeholder="Select Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Data Retention</Label>
                  <Select
                    value={settings.privacy.dataRetention}
                    onValueChange={(value) => updatePrivacySettings({ ...settings.privacy, dataRetention: value })}
                  >
                    <SelectTrigger id="data-retention">
                      <SelectValue placeholder="Select Data Retention Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="1-year">1 Year</SelectItem>
                      <SelectItem value="2-years">2 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePrivacy}>Save Privacy Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

