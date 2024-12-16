"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const SetPassword = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="mb-4 p-4 sm:mt-[-182px]">
                <Image
                src="/selise-logo.svg"
                width={128}
                height={54.931}
                alt="SELISE Logo"
                />
            </div>
            <Card className="mx-auto w-full rounded border-solid border-background text-center shadow-none sm:max-w-md sm:border-[#95ADC4]">
                <CardHeader>
                <CardTitle className="text-3xl leading-9">Set password</CardTitle>
                <CardDescription className="text-xl text-foreground">
                    Choose password to activate account
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
                    <Link href={""}>
                    <Button type="submit" className="w-full rounded">
                        Activate
                    </Button>
                    </Link>
                </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SetPassword;
