"use client";

import {SvgIcon} from "@/components/ui/common";

export const Footer = () => {
    return (
        <footer className="py-4 px-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-6">
                    <span>Copyright © 2025 <span className="text-primary font-medium">Souaba</span></span>
                    <a href="#" className="hover:text-foreground">Privacy Policy</a>
                    <a href="#" className="hover:text-foreground">Term and conditions</a>
                    <a href="#" className="hover:text-foreground">Contact</a>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-foreground">
                        <SvgIcon size={24} name={'facebook'} />
                    </a>
                    <a href="#" className="hover:text-foreground">
                        <SvgIcon size={24} name={'XLogo'} />
                    </a>
                    <a href="#" className="hover:text-foreground">
                        <SvgIcon size={24} name={'Insta'} />

                    </a>
                    <a href="#" className="hover:text-foreground">
                        <SvgIcon size={24} name={'Youtube'} />

                    </a>
                    <a href="#" className="hover:text-foreground">
                        <SvgIcon size={24} name={'Linkedin'} />

                    </a>
                </div>
            </div>
        </footer>
    );
};
