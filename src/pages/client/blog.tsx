function BlogC() {
    const articles = [
        {
            id: 1,
            title: "Tiêu đề bài viết 1",
            description: "Mô tả ngắn gọn về bài viết này. Đây là nội dung tóm tắt để thu hút người đọc.",
            image: "/src/assets/banner_login.jpeg"
        },
        {
            id: 2,
            title: "Tiêu đề bài viết 2",
            description: "Mô tả ngắn gọn về bài viết này. Đây là nội dung tóm tắt để thu hút người đọc.",
            image: "/src/assets/banner_login.jpeg"
        },
        {
            id: 3,
            title: "Tiêu đề bài viết 3",
            description: "Mô tả ngắn gọn về bài viết này. Đây là nội dung tóm tắt để thu hút người đọc.",
            image: "/src/assets/banner_login.jpeg"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Tiêu đề trang */}
            <h1 className="text-3xl font-bold text-center mb-6">Tin Tức Mới Nhất</h1>
            
            {/* Danh sách bài viết */}
            <div className="space-y-6">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={article.image}
                            alt="Bài viết"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{article.title}</h2>
                            <p className="text-gray-600 mt-2">{article.description}</p>
                            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                                Đọc tiếp
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogC;