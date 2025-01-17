import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';

export const GeneralInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl leading-9">Activate account</CardTitle>
          <CardDescription className="text-xl text-foreground">
            Choose password to activate account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1>General Information</h1>
        </CardContent>
      </Card>
      <Card className="w-full border-none rounded-[8px] shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl leading-9">Activate account</CardTitle>
          <CardDescription className="text-xl text-foreground">
            Choose password to activate account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1>General Information</h1>
        </CardContent>
      </Card>
    </div>
  );
};
