"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
    
} from "../../components/ui/form";



import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import toast from "react-hot-toast";



const formSchema = z.object({
    title: z.string().min(1, {
        message:"Title is required"
    })
})
 

const CreatePage = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title:""
        },
    })


    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

         
        try {

             console.log("Payload to be sent:", { title: values.title });


             const response = await axios.post("/api/tractor", { 
            title: values.title 
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
            router.push(`/seller/tractors/${response.data.id}`)
            toast.success("Tractor created Successfully");
            
        } catch(error)  {
            toast.error("Something went wrong");
            console.error(error);
        }
    }


    return (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">Name your Tractor</h1>
                <p className="text-sm text-slate-600">
                    What would you like to name your tractor?
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tractor title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Tractor X100'"
                                            {...field}
                                        
                                        />
                                    </FormControl>

                                    <FormDescription>
                                        What are the descriptions of the tractor?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>                        
                            )} />
                        <div className="flex gap-x-2 items-center">
                            <Link href="/">
                                <Button
                                    type="button"
                                variant="ghost"
                                >
                                   Cancel 
                               </Button>
                            
                            </Link>

                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Continue
                            </Button>

                        </div>
                    </form>

                </Form>
        </div>
        </div>
    );
}
 
export default CreatePage;