
import { ReactNode } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EntityFormProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  children: ReactNode;
  isLoading?: boolean;
  isEdit?: boolean;
}

export const EntityForm = ({
  onSubmit,
  onCancel,
  children,
  isLoading = false,
  isEdit = false,
}: EntityFormProps) => {
  return (
    <Card className="w-full border-0 shadow-none">
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pt-0">
          {children}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 pt-4">
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
