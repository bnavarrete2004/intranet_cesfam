// ======================================================
// COMPONENTE: QuickAccessWidget
// Ubicación: src/components/common/QuickAccessWidget.tsx
// Descripción: Widget de accesos rápidos a módulos
// ======================================================

'use client';

import React from 'react';
import { Card } from '@/components/ui/cardsn';
import type { QuickAccess } from '../../types/homepage';
import { ArrowRight } from 'lucide-react';

interface QuickAccessWidgetProps {
  items: QuickAccess[];
  onNavigate: (route: string) => void;
}

export const QuickAccessWidget: React.FC<QuickAccessWidgetProps> = ({
  items,
  onNavigate
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <Card
          key={item.id}
          onClick={() => onNavigate(item.route)}
          className={`
            p-6 cursor-pointer transition-all duration-300
            hover:shadow-2xl hover:scale-105 hover:-translate-y-1
            border-0 ${item.bgColor}
            animate-fadeIn
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className={`
              w-16 h-16 rounded-2xl ${item.bgColor}
              flex items-center justify-center
              text-4xl shadow-md
              group-hover:scale-110 transition-transform
            `}>
              {item.icon}
            </div>
            <div>
              <h3 className={`font-bold ${item.color} text-sm`}>
                {item.title}
              </h3>
            </div>
            <ArrowRight className={`w-4 h-4 ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickAccessWidget;