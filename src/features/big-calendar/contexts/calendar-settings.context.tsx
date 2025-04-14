import { createContext, useContext, useState, ReactNode } from 'react';

interface CalendarSettings {
  firstDayOfWeek: number;
  timeScale: number;
  defaultDuration: number;
}

interface CalendarSettingsContextType {
  settings: CalendarSettings;
  updateSettings: (newSettings: Partial<CalendarSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: CalendarSettings = {
  firstDayOfWeek: 1, // Monday (Monday-Sunday)
  timeScale: 30, // 30 minutes
  defaultDuration: 30, // 30 minutes
};

const CalendarSettingsContext = createContext<CalendarSettingsContextType | undefined>(undefined);

export function CalendarSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<CalendarSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<CalendarSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <CalendarSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </CalendarSettingsContext.Provider>
  );
}

export function useCalendarSettings() {
  const context = useContext(CalendarSettingsContext);
  if (context === undefined) {
    throw new Error('useCalendarSettings must be used within a CalendarSettingsProvider');
  }
  return context;
}

export { defaultSettings };
