/**
 * @param props {import("react-error-boundary").FallbackProps} error-boundary
 * */
export default function BoundaryError(props) {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <img src="/error.svg" className="w-180" />

                <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {props.error.message || "Uh-oh!"}
                </h1>

                <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
                <button
                    onClick={() => {}}
                    className="inline-block rounded-sm border border-yellow-600 bg-yellow-600 px-12 py-3 text-sm font-medium text-black hover:bg-transparent hover:text-yellow-600 focus:ring-3 focus:outline-hidden"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
