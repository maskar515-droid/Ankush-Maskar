/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  HeartPulse, 
  GraduationCap, 
  Trash2, 
  Users, 
  Home, 
  Phone, 
  Bell, 
  Menu, 
  X,
  Plus,
  ArrowRight,
  Info,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Types
type Section = 'home' | 'health' | 'education' | 'cleanliness' | 'social';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'मुख्य पृष्ठ', icon: Home },
    { id: 'health', label: 'आरोग्य', icon: HeartPulse },
    { id: 'education', label: 'शिक्षण', icon: GraduationCap },
    { id: 'cleanliness', label: 'स्वच्छता', icon: Trash2 },
    { id: 'social', label: 'सामाजिक', icon: Users },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection setActiveSection={setActiveSection} />;
      case 'health':
        return <HealthSection />;
      case 'education':
        return <EducationSection />;
      case 'cleanliness':
        return <CleanlinessSection />;
      case 'social':
        return <SocialSection />;
      default:
        return <HomeSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b bg-card sticky top-0 z-50 border-olive/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-olive rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
            ग
          </div>
          <h1 className="text-xl font-bold tracking-tight font-serif text-olive">ग्राम सुधार</h1>
        </div>
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-primary">ग्राम सुधार</h2>
              <p className="text-sm text-muted-foreground mt-1">आपल्या गावाचा विकास, आपल्या हातात</p>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-3 h-12 text-lg font-medium"
                  onClick={() => {
                    setActiveSection(item.id as Section);
                    setIsSidebarOpen(false);
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card h-screen sticky top-0">
        <div className="p-8 border-b border-olive/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-olive rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              ग
            </div>
            <h1 className="text-2xl font-bold tracking-tighter font-serif text-olive">ग्राम सुधार</h1>
          </div>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Village Progress</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'secondary' : 'ghost'}
              className={`w-full justify-start gap-4 h-12 text-base font-semibold transition-all duration-200 rounded-xl ${activeSection === item.id ? 'bg-secondary text-olive' : 'text-muted-foreground hover:text-olive hover:bg-secondary/50'}`}
              onClick={() => setActiveSection(item.id as Section)}
            >
              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-olive' : 'text-muted-foreground'}`} />
              {item.label}
            </Button>
          ))}
        </nav>
        <div className="p-6 border-t bg-muted/30">
          <div className="flex items-center gap-3 p-3 bg-destructive/10 rounded-xl text-destructive border border-destructive/20">
            <Phone className="w-5 h-5 animate-pulse" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">आपत्कालीन मदत</p>
              <p className="text-sm font-bold">१०८ / १००</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Emergency Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Button size="icon" className="w-14 h-14 rounded-full shadow-2xl bg-destructive hover:bg-destructive/90 text-white">
          <Phone className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}

// --- Components for Sections ---

function HomeSection({ setActiveSection }: { setActiveSection: (s: Section) => void }) {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive/10 text-olive text-[10px] font-bold uppercase tracking-widest border border-olive/10">
          <Bell className="w-3 h-3" />
          ताज्या बातम्या
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-serif">
          नमस्कार, <span className="text-olive">ग्रामस्थ!</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed italic">
          आपल्या गावाच्या प्रगतीसाठी आणि सुविधेसाठी हे डिजिटल व्यासपीठ. आरोग्य, शिक्षण आणि स्वच्छतेची सर्व माहिती एकाच ठिकाणी.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="आरोग्य केंद्र" 
          value="सुरू आहे" 
          description="आज दुपारी ४ वाजेपर्यंत" 
          icon={HeartPulse} 
          color="bg-terracotta"
          onClick={() => setActiveSection('health')}
        />
        <StatCard 
          title="शाळा उपस्थिती" 
          value="९५%" 
          description="आजची सरासरी उपस्थिती" 
          icon={GraduationCap} 
          color="bg-ocean"
          onClick={() => setActiveSection('education')}
        />
        <StatCard 
          title="कचरा संकलन" 
          value="१०:३० AM" 
          description="पुढील संकलन वेळ" 
          icon={Trash2} 
          color="bg-leaf"
          onClick={() => setActiveSection('cleanliness')}
        />
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">महत्वाचे कार्यक्रम</h3>
          <Button variant="ghost" className="gap-2" onClick={() => setActiveSection('social')}>
            सर्व पहा <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard 
            title="मोफत आरोग्य शिबिर" 
            date="२० एप्रिल २०२४" 
            location="ग्रामपंचायत कार्यालय" 
            tag="आरोग्य"
          />
          <EventCard 
            title="वृक्षारोपण मोहीम" 
            date="२२ एप्रिल २०२४" 
            location="गावाचा मुख्य रस्ता" 
            tag="स्वच्छता"
          />
        </div>
      </section>
    </div>
  );
}

function HealthSection() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">आरोग्य सुविधा</h2>
        <p className="text-muted-foreground">गावातील आरोग्य सेवा आणि महत्वाचे संपर्क.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 overflow-hidden border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] bg-gradient-to-br from-terracotta/5 to-white dark:from-terracotta/20 dark:to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-2xl">
              <HeartPulse className="w-6 h-6 text-terracotta" />
              प्राथमिक आरोग्य केंद्र
            </CardTitle>
            <CardDescription>वेळ: सकाळी ९ ते संध्याकाळी ५</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-card rounded-2xl border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-terracotta/10 dark:bg-terracotta/30 flex items-center justify-center text-terracotta">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">डॉ. समीर कुलकर्णी</p>
                <p className="text-sm text-muted-foreground">मुख्य वैद्यकीय अधिकारी</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto rounded-full">संपर्क</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-card rounded-2xl border text-center">
                <p className="text-2xl font-bold text-terracotta">१२</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">उपलब्ध खाटा</p>
              </div>
              <div className="p-4 bg-white dark:bg-card rounded-2xl border text-center">
                <p className="text-2xl font-bold text-leaf">हो</p>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">रुग्णवाहिका</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">महत्वाचे क्रमांक</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ContactItem label="रुग्णवाहिका" number="१०८" />
            <ContactItem label="पोलीस" number="१००" />
            <ContactItem label="अग्निशमन" number="१०१" />
            <ContactItem label="गावातील मेडिकल" number="९८७६५४३२१०" />
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold">आरोग्य टिप्स</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TipCard title="पाणी उकळून प्या" content="पावसाळ्यात जलजन्य आजार टाळण्यासाठी पाणी नेहमी उकळून आणि गाळून प्यावे." />
          <TipCard title="नियमित व्यायाम" content="रोज किमान ३० मिनिटे चालणे किंवा व्यायाम करणे आरोग्यासाठी उत्तम आहे." />
          <TipCard title="स्वच्छता राखा" content="जेवणापूर्वी हात साबणाने स्वच्छ धुवावेत." />
        </div>
      </section>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">शिक्षण आणि विकास</h2>
        <p className="text-muted-foreground">गावातील शाळा, वाचनालय आणि शिष्यवृत्ती माहिती.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="h-48 bg-ocean/10 dark:bg-ocean/20 flex items-center justify-center">
            <GraduationCap className="w-24 h-24 text-ocean opacity-20 absolute" />
            <div className="text-center p-6 relative">
              <h3 className="text-2xl font-bold text-ocean dark:text-ocean/90 font-serif">जिल्हा परिषद शाळा</h3>
              <p className="text-ocean/80 dark:text-ocean/70 italic">इयत्ता १ ली ते १० वी</p>
              <div className="mt-4 flex justify-center gap-2">
                <Badge variant="outline" className="bg-white/50 border-ocean/20 rounded-full">डिजिटल क्लासरूम</Badge>
                <Badge variant="outline" className="bg-white/50 border-ocean/20 rounded-full">संगणक लॅब</Badge>
              </div>
            </div>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">एकूण विद्यार्थी</span>
              <span className="font-bold">४५०</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">शिक्षक संख्या</span>
              <span className="font-bold">१५</span>
            </div>
            <Button className="w-full bg-ocean hover:bg-ocean/90 text-white rounded-full">शाळेची माहिती पहा</Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                नवीन शिष्यवृत्ती
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="font-bold text-sm">सावित्रीबाई फुले शिष्यवृत्ती</p>
                <p className="text-xs text-muted-foreground">मुलींसाठी विशेष योजना - अर्ज करण्याची शेवटची तारीख: ३० एप्रिल</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="font-bold text-sm">राज्य सरकार मॅट्रिकपूर्व शिष्यवृत्ती</p>
                <p className="text-xs text-muted-foreground">इयत्ता ५ वी ते १० वी च्या विद्यार्थ्यांसाठी</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-olive text-white rounded-[24px]">
            <CardHeader>
              <CardTitle className="text-lg font-serif">गावाचे वाचनालय</CardTitle>
              <CardDescription className="text-white/70">वेळ: संध्याकाळी ५ ते ८</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">येथे स्पर्धा परीक्षांची पुस्तके, वर्तमानपत्रे आणि मासिके उपलब्ध आहेत.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm" className="w-full rounded-full bg-white/20 hover:bg-white/30 text-white border-none">पुस्तकांची यादी पहा</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CleanlinessSection() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">स्वच्छता आणि पर्यावरण</h2>
        <p className="text-muted-foreground">आपले गाव, स्वच्छ गाव.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] bg-leaf text-white rounded-[32px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif text-xl">
              <Trash2 className="w-6 h-6" />
              कचरा संकलन
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-6">
              <p className="text-5xl font-bold">१०:३०</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest mt-1">पुढील वेळ (सकाळी)</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>ओला कचरा</span>
                <span className="font-bold">सोम, बुध, शुक्र</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>सुका कचरा</span>
                <span className="font-bold">मंगळ, गुरु, शनि</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-none shadow-xl">
          <CardHeader>
            <CardTitle>समस्या नोंदवा</CardTitle>
            <CardDescription>गावात कोठेही कचरा किंवा अस्वच्छता दिसल्यास येथे कळवा.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex-col gap-2 border-dashed border-2">
                <Plus className="w-6 h-6 text-muted-foreground" />
                फोटो अपलोड करा
              </Button>
              <div className="space-y-2">
                <label className="text-sm font-medium">ठिकाण निवडा</label>
                <select className="w-full p-2 rounded-md border bg-background">
                  <option>मुख्य चौक</option>
                  <option>शाळेजवळ</option>
                  <option>मंदिरामागे</option>
                  <option>इतर</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-leaf hover:bg-leaf/90 text-white rounded-full">तक्रार नोंदवा</Button>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl font-bold">स्वच्छता मोहीम प्रगती</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusBadge label="सार्वजनिक शौचालय" status="स्वच्छ" color="text-leaf" />
          <StatusBadge label="पाण्याचे टाके" status="नुकतेच साफ" color="text-leaf" />
          <StatusBadge label="गटार व्यवस्था" status="काम सुरू" color="text-terracotta" />
          <StatusBadge label="रस्ते स्वच्छता" status="नियमित" color="text-leaf" />
        </div>
      </section>
    </div>
  );
}

function SocialSection() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold">सामाजिक कार्यक्रम आणि योजना</h2>
        <p className="text-muted-foreground">गावातील एकोपा आणि सरकारी योजनांची माहिती.</p>
      </header>

      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
          <Calendar className="w-5 h-5 text-olive" />
          येणारे कार्यक्रम
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-lg overflow-hidden flex flex-col sm:flex-row rounded-[24px]">
            <div className="w-full sm:w-32 bg-olive text-white flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold font-serif">२०</span>
              <span className="text-sm uppercase font-bold">एप्रिल</span>
            </div>
            <div className="flex-1 p-6">
              <Badge className="mb-2 bg-terracotta hover:bg-terracotta/90 border-none rounded-full">आरोग्य</Badge>
              <h4 className="text-xl font-bold font-serif">मोफत डोळे तपासणी शिबिर</h4>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> ग्रामपंचायत हॉल
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> सकाळी १० ते दुपारी २
              </p>
            </div>
          </Card>

          <Card className="border-none shadow-lg overflow-hidden flex flex-col sm:flex-row rounded-[24px]">
            <div className="w-full sm:w-32 bg-secondary text-olive flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold font-serif">०१</span>
              <span className="text-sm uppercase font-bold">मे</span>
            </div>
            <div className="flex-1 p-6">
              <Badge className="mb-2 bg-ocean hover:bg-ocean/90 border-none rounded-full">सांस्कृतिक</Badge>
              <h4 className="text-xl font-bold font-serif">महाराष्ट्र दिन सोहळा</h4>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> गावाचे मैदान
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> सकाळी ८ वाजता
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2 font-serif">
          <Info className="w-5 h-5 text-olive" />
          सरकारी योजना (गावासाठी)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SchemeCard title="शेतकरी सन्मान योजना" description="वार्षिक ६००० रुपये मदत." />
          <SchemeCard title="घरकुल योजना" description="घर बांधण्यासाठी आर्थिक सहाय्य." />
          <SchemeCard title="विहीर पुनर्भरण" description="पाणी पातळी वाढवण्यासाठी अनुदान." />
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ title, value, description, icon: Icon, color, onClick }: any) {
  return (
    <Card className="group cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-300 border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden rounded-[32px]" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-xl ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6" />
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="mt-6">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{title}</p>
          <h4 className="text-3xl font-bold mt-1 font-serif">{value}</h4>
          <p className="text-sm text-muted-foreground mt-1 italic">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function EventCard({ title, date, location, tag }: any) {
  return (
    <Card className="border-none shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-shadow bg-card rounded-[24px]">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-widest bg-secondary/50 text-primary border-none rounded-full">{tag}</Badge>
          <h4 className="font-bold text-lg leading-tight font-serif">{title}</h4>
          <div className="flex flex-col gap-1 mt-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {date}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {location}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactItem({ label, number }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-card rounded-lg border shadow-sm">
      <span className="text-sm font-medium">{label}</span>
      <Button variant="link" className="text-primary font-bold p-0 h-auto">{number}</Button>
    </div>
  );
}

function TipCard({ title, content }: any) {
  return (
    <div className="p-4 bg-white dark:bg-card rounded-2xl border shadow-sm space-y-2">
      <div className="w-8 h-8 rounded-full bg-olive/10 flex items-center justify-center text-olive">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <h4 className="font-bold text-sm font-serif">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed italic">{content}</p>
    </div>
  );
}

function StatusBadge({ label, status, color }: any) {
  return (
    <div className="p-3 bg-white dark:bg-card rounded-lg border flex items-center justify-between">
      <span className="text-xs font-medium">{label}</span>
      <span className={`text-xs font-bold ${color}`}>{status}</span>
    </div>
  );
}

function SchemeCard({ title, description }: any) {
  return (
    <div className="p-4 bg-white dark:bg-card rounded-2xl border-l-4 border-l-olive shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-bold text-sm font-serif">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1 italic">{description}</p>
      <Button variant="link" className="p-0 h-auto text-xs mt-2 text-olive">अधिक माहिती</Button>
    </div>
  );
}
