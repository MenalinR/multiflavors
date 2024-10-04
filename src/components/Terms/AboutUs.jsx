import React from 'react'

const AboutUs = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">AboutUs</h1>
        <p className="mb-4">Multiflavours is a family-run business, specializing in selling a variety of Snacks, Sweets, Nuts, Dried Fruits, and Dry Fish.</p>
        <p className="mb-6">We currently have our store located at <span className="font-semibold"> No.A46, Maddumage Watta Housing Scheme,Nugegoda</span>, and our online store at<a href="https://www.multiflavours.com" className="text-blue-500 underline"> www.multiflavours.com.</a></p>
        <p className="mb-6">You can find us here on <a href='https://maps.app.goo.gl/vq71owXn2jJsn8qq6' className="text-blue-500 underline">Google Maps.</a></p>
        <h2 className="text-2xl font-semibold mb-4">Our Aim</h2>
        <p className="mb-4">
        To establish <span className="font-semibold">Multiflavours</span> as the premier seller of the finest nuts ,snack,sweets  dry fish and dried fruits in Sri Lanka while maintaining our uncompromising principles as we grow. The following six guiding principles will help us measure the appropriateness of our decisions:
      </p>
      <ul className="list-disc pl-6 mb-8">
        <li>Provide a great work environment and treat each other with respect and dignity.</li>
        <li>Embrace diversity as an essential component in the way we do business.</li>
        <li>Apply the highest standards of excellence to the purchasing, roasting, and fresh delivery of our products.</li>
        <li>Develop enthusiastically satisfied customers all of the time.</li>
        <li>Contribute positively to our communities and our environment.</li>
        <li>Recognize that profitability is essential to our future success.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Our Guarantee</h2>
      <p className="mb-8">
        <span className="font-semibold">Your Satisfaction. Guaranteed. Unconditionally.</span> At <span className="font-semibold">Multiflavours</span>, we guarantee absolute satisfaction. If you experience any problems with our products, customer service, shipping, or even if you simply don’t like what you bought, please let us know. We’ll do whatever it takes to make it right for you.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Store Opening Hours</h2>
      <p className="mb-8">
       Our Store located at No.A46, Maddumage Watta Housing Scheme,Nugegoda is open during the following hours.
      </p>
      <ul className="list-disc pl-6 mb-8">
        <li>Monday to Saturday and Poya days: 9:00 AM to 11:00 PM</li>
        <li>Sundays : 2:00 PM to 11:00 PM</li>
      </ul>
        </div>
  )
}

export default AboutUs