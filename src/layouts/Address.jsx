import { Mail, MapPin, Phone } from 'lucide-react'
export default function Address({className = "space-y-8", classNamee ="flex items-center space-x-4" 
}){
    return(
        <div className={className}>
            <div className={classNamee}>
              <div className="bg-zinc-800 p-4 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p>SWAYAMBHU, KATHMANDU,</p>
                <p>NEPAL</p>
              </div>
            </div>

            <div className={classNamee}>
              <div className="bg-zinc-800 p-4 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p>+977 9843856808 | +977 9876543210</p>
              </div>
            </div>

            <div className={classNamee}>
              <div className="bg-zinc-800 p-4 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p>hercules.gym@gmail.com</p>
              </div>
            </div>
            </div>
    )
}
