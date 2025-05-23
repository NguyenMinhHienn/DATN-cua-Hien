function ContactC() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Liên Hệ</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Họ và tên</label>
                        <input 
                            type="text" 
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none" 
                            placeholder="Nhập họ và tên" 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Email</label>
                        <input 
                            type="email" 
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none" 
                            placeholder="Nhập email" 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Tin nhắn</label>
                        <textarea 
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none" 
                            placeholder="Nhập nội dung tin nhắn"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Gửi tin nhắn
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactC;