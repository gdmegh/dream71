
'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface PortfolioChartProps {
    chartData: any[];
}

export default function PortfolioChart({ chartData }: PortfolioChartProps) {
    if (!chartData || chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Project Growth</CardTitle>
                    <CardDescription>Key metrics demonstrating the project's success over time.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">No chart data available.</p>
                </CardContent>
            </Card>
        );
    }
  
    const valueFormatter = (number: number) => new Intl.NumberFormat("us").format(number).toString();
    const dataKey = Object.keys(chartData[0] || {}).find(key => key.toLowerCase() !== 'month' && key.toLowerCase() !== 'year' && key.toLowerCase() !== 'name');

    if (!dataKey) {
         return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Project Growth</CardTitle>
                    <CardDescription>Key metrics demonstrating the project's success over time.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground">Chart data is not formatted correctly.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Project Growth</CardTitle>
                <CardDescription>Key metrics demonstrating the project's success over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={valueFormatter} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))',
                                color: 'hsl(var(--card-foreground))'
                            }}
                        />
                        <Area type="monotone" dataKey={dataKey} stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMetric)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
