
import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface EntityFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  children: ReactNode;
  isLoading?: boolean;
  isEdit?: boolean;
}

export const EntityForm = ({
  title,
  onSubmit,
  onCancel,
  children,
  isLoading = false,
  isEdit = false,
}: EntityFormProps) => {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg animate-scale-in">
      <form onSubmit={onSubmit}>
        <CardHeader className="relative border-b">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="absolute right-4 top-4 h-8 w-8"
          >
            <X size={18} />
          </Button>
          <CardTitle>{isEdit ? `Edit ${title}` : `Add ${title}`}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          {children}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t p-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
