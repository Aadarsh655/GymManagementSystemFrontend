import { Apple, Dumbbell, Heart, Gauge } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Gauge,
      title: "Modern equipment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis."
    },
    {
      icon: Apple,
      title: "Healthy nutrition plan",
      description: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
    },
    {
      icon: Dumbbell,
      title: "Proffesponal training plan",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilisis."
    },
    {
      icon: Heart,
      title: "Unique to your needs",
      description: "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis."
    }
  ]

  return (
    <section className="bg-neutral-900 py-16 px-4 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium mb-4 text-2xl">WHY CHOSE US?</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">PUSH YOUR LIMITS FORWARD</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-zinc-800 rounded-full p-6 mb-6">
                <feature.icon className="w-12 h-12 text-primary" />
              </div>
              <h4 className="text-white text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
