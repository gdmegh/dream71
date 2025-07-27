'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="space-y-8">
                <div className="text-left mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Get In Touch</h2>
                    <p className="font-body text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Do you have a project in mind or a question for our team? We are eager to listen and explore how we can collaborate to bring your vision to life.
                    </p>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-semibold">Our Office</h3>
                        <p className="text-muted-foreground">House #123, Road #45, Dhaka 1212, Bangladesh</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Mail className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-semibold">Email Us</h3>
                        <a href="mailto:contact@dream71.com" className="text-muted-foreground hover:text-primary transition-colors">contact@dream71.com</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl font-semibold">Call Us</h3>
                        <a href="tel:+880123456789" className="text-muted-foreground hover:text-primary transition-colors">+880 123 456 789</a>
                    </div>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Send a Message</CardTitle>
                    <CardDescription>Fill out the form and we'll be in touch.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us about your project..." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" width="full">Send Message</Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
