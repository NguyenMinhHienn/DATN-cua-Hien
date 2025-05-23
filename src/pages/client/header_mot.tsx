function HeaderMot() {
    return (
        <header className="bg-black w-full flex flex-col relative py-3">
            <div className="w-full flex gap-2 justify-center items-center text-center">
                <p className="text-white">
                    Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
                </p>
                <button className="underline text-white">ShopNow</button>
            </div>

            <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <select className="bg-black text-white">
                    <option>English</option>
                    <option>Vietnamese</option>
                </select>
            </div>
        </header>
    );
}

export default HeaderMot