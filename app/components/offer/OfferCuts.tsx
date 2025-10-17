import {Image} from '@shopify/hydrogen';

interface OfferCutsProps {
  readonly cuts: string[];
  readonly productImages?: Array<{
    url: string;
    altText?: string;
  }>;
}

export function OfferCuts({cuts, productImages}: OfferCutsProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        What's Inside Your Box
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Cuts List */}
        <div className="space-y-4">
          {cuts.map((cut: string, index: number) => (
            <div
              key={`cut-${cut.slice(0, 10)}-${index}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold text-sm">
                  {index + 1}
                </span>
              </div>
              <span className="text-lg font-medium">{cut}</span>
            </div>
          ))}
        </div>

        {/* Right: Image Grid */}
        <div className="grid grid-cols-2 gap-4">
          {cuts.map((cut, index) => (
            <div
              key={`image-${index}`}
              className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden"
            >
              {productImages?.[index] ? (
                <Image
                  data={productImages[index]}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm text-center px-2">
                  {cut.split(' ')[0]} {cut.split(' ')[1]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
