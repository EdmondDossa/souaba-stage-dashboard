"use client";

import { useState } from "react";
import { Search, CalendarDays, Plus, Eye, Edit , ChevronUp, ChevronDown, ChevronRight, Filter, Phone, MailOpen} from "lucide-react";
import {ChevronUpDownIcon, FunnelIcon } from "@heroicons/react/24/solid";


export default function PageProfil () {
    return (
        <div>
            <aside>
                <div>
                    <img src="/images/jaylonprofile.png" alt="" />
                    <h1>Angus Copper</h1>
                    <p>G011-987654321</p>
                </div>
                <div></div>
                <div>
                    <div>
                        <Phone/>
                        <p>+1 (555) 789-1234</p>
                    </div>
                    <div>
                        <MailOpen/>
                        <p>angus.copper@example.com</p>
                    </div>
                </div>
                <div></div>
                <div className="">
                    <h1>Informations personnelles</h1>
                    <div className="rows">
                        <div className="col">
                            <p>Date de naissance</p>
                            <p>15 juin 1985</p>
                        </div>
                        <div className="col">
                            <p>Genre</p>
                            <p>Genre</p>
                        </div>
                    </div>
                    <div className="rows">
                        <div className="col">
                            <p>Nationalité</p>
                            <p>Nationalité</p>
                        </div>
                        <div className="col">
                            <p>Passport No.</p>
                            <p>A12345678</p>
                        </div>
                    </div>
                </div>
                <div></div>
            </aside>
            <div>
                
            </div>
        </div>
        
    )
}
