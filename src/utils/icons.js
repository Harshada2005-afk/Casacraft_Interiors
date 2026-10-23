import {
  Home,
  Sofa,
  BedDouble,
  ChefHat,
  Briefcase,
  Store,
  Box,
  Sparkles,
  Gem,
  Users,
  Eye,
  MessageSquare,
  PenTool,
  Hammer,
  Layers,
  FolderKanban,
  CalendarCheck,
  CalendarClock,
  CircleCheck,
  Heart,
} from 'lucide-react';

/**
 * Mock data stores icon *names* (plain strings) so it stays JSON-friendly
 * and can later come straight from an API. Components look the icon up here.
 */
export const iconMap = {
  Home,
  Sofa,
  BedDouble,
  ChefHat,
  Briefcase,
  Store,
  Box,
  Sparkles,
  Gem,
  Users,
  Eye,
  MessageSquare,
  PenTool,
  Hammer,
  Layers,
  FolderKanban,
  CalendarCheck,
  CalendarClock,
  CircleCheck,
  Heart,
};

export const getIcon = (name) => iconMap[name] || Sparkles;
