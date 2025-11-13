import { LuSendHorizontal } from "react-icons/lu";

const SubscribeToNewsLetter = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-x-6 lg:gap-x-8 bg-[#E8EAEC] px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="text-center md:text-left">
                <strong className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-montserrat-bold block">
                    NEWSLETTER
                </strong>
                <span className="text-sm md:text-base text-gray-700 font-montserrat-medium block mt-1">
          Restez à jour
        </span>
            </div>
            <div className="flex items-center gap-0 w-full md:w-auto md:min-w-[400px] lg:min-w-[500px]">
                <input
                    type="email"
                    className="text-sm md:text-base text-gray-600 flex-1 border border-gray-300 bg-white rounded-l-full rounded-tr-3xl px-4 md:px-5 lg:px-6 py-2.5 md:py-3 ring-1 ring-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="Votre e-mail ..."
                    required
                />
                <button
                    type="submit"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center hover:scale-105 hover:bg-primary/90 transition-all cursor-pointer -ml-6 md:-ml-7"
                    aria-label="Envoyer"
                >
                    <LuSendHorizontal className="text-white text-xl md:text-2xl" />
                </button>
            </div>
        </section>
    );
};

export default SubscribeToNewsLetter;