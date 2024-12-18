"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";


const ResetPassword = () => {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Card className="mx-auto w-full rounded border-solid border-background text-center shadow-none sm:max-w-md sm:border-[#95ADC4]">
        <CardHeader>
            <CardTitle className="text-3xl leading-9">Reset password</CardTitle>
            <CardDescription className="text-xl text-foreground">
                Choose password to reset account
            </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid gap-4">
              <div className="grid gap-2 text-left text-sm">
              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="rounded border border-solid border-[#95ADC4]"
              />
              </div>
              <div className="grid gap-2 text-left text-sm">
              <Label htmlFor="password">Confirm password</Label>
              <Input
                  id="confirm-password"
                  type="confirm-password"
                  placeholder="Confirm your password"
                  required
                  className="rounded border border-solid border-[#95ADC4]"
              />
              </div>
              <Button type="submit" className="w-full rounded">
                  Activate
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
