
'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ServiceChartProps {
    chartData: any[];
}

export default function ServiceChart({ chartData }: ServiceChartProps) {
    if (!chartData || chartData.length === 0) {
        return (
            <div className="h-72 mt-4 flex items-center justify-center">
                <p className="text-muted-foreground">No chart data available.</p>
            </div>
        );
    }
    
    const data = chartData.map((d: any) => ({...d, year: d.year ? d.year.toString() : ''}));
    const valueFormatter = (number: number) => new Intl.NumberFormat("us").format(number).toString();

    const hasAdoptionRate = data[0] && data[0]['Adoption Rate'] !== undefined;

    return (
        <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        {hasAdoptionRate && <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                        </linearGradient>}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={valueFormatter} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            borderColor: 'hsl(var(--border))',
                            color: 'hsl(var(--card-foreground))'
                        }}
                    />
                    <Area type="monotone" dataKey="Projects" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorProjects)" />
                    {hasAdoptionRate && <Area type="monotone" dataKey="Adoption Rate" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorAdoption)" />}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

