const MEDICINES = [
  {
    id: "para-500",
    name: "Paracetamol 500mg",
    brand: "An Tâm",
    image: "img/Paracetamol 500mg .webp",
    category: "Giảm đau - hạ sốt",
    ingredient: "Paracetamol",
    price: 18000,
    pack: "Hộp 10 vỉ x 10 viên",
    stock: 164,
    rating: 4.8,
    badge: "Bán chạy",
    usage: "Hỗ trợ giảm sốt, đau đầu, đau nhức cơ mức độ nhẹ đến vừa.",
    dosage: "Người lớn: 1 viên mỗi 4-6 giờ khi cần.",
    caution: "Không vượt quá 4g/ngày. Thận trọng nếu có bệnh gan.",
    symptomTags: ["sốt", "đau đầu", "cảm lạnh", "đau nhức"],
    diseaseIds: ["fever", "cold"],
    graphWeight: 0.92
  },
  {
    id: "loratadine",
    name: "Loratadine 10mg",
    brand: "Dịu Mũi",
    image: "img/Loratadine 10mg.webp",
    category: "Dị ứng",
    ingredient: "Loratadine",
    price: 32000,
    pack: "Hộp 3 vỉ x 10 viên",
    stock: 98,
    rating: 4.7,
    badge: "Không gây buồn ngủ",
    usage: "Hỗ trợ giảm hắt hơi, sổ mũi, ngứa mũi và nổi mề đay do dị ứng.",
    dosage: "Người lớn: 1 viên/ngày.",
    caution: "Nếu có bệnh gan hoặc đang mang thai cần hỏi ý kiến chuyên môn.",
    symptomTags: ["dị ứng", "ngứa", "hắt hơi", "sổ mũi"],
    diseaseIds: ["allergy", "cold"],
    graphWeight: 0.87
  },
  {
    id: "saline-spray",
    name: "Xịt mũi Natri Clorid 0.9%",
    brand: "Mũi Sạch",
    category: "Tai - Mũi - Họng",
    ingredient: "Natri clorid",
    price: 46000,
    pack: "Chai 70ml",
    stock: 73,
    rating: 4.6,
    badge: "Dùng hàng ngày",
    usage: "Làm sạch hốc mũi, hỗ trợ giảm nghẹt mũi và khô niêm mạc.",
    dosage: "Xịt 1-2 nhát mỗi bên mũi, 2-4 lần/ngày.",
    caution: "Giữ đầu xịt sạch, không dùng chung để hạn chế lây nhiễm.",
    symptomTags: ["nghẹt mũi", "sổ mũi", "cảm lạnh"],
    diseaseIds: ["cold", "rhinitis"],
    graphWeight: 0.71
  },
  {
    id: "acetylcysteine",
    name: "Acetylcysteine 200mg",
    brand: "Dịu Đờm",
    category: "Hô hấp",
    ingredient: "Acetylcysteine",
    price: 54000,
    pack: "Hộp 30 gói",
    stock: 61,
    rating: 4.5,
    badge: "Tan đờm",
    usage: "Hỗ trợ làm loãng đờm trong các trường hợp ho có đờm.",
    dosage: "Người lớn: 1 gói/lần, 2-3 lần/ngày.",
    caution: "Không phù hợp cho ho khan kéo dài chưa rõ nguyên nhân.",
    symptomTags: ["ho đờm", "viêm họng", "khó khạc đờm"],
    diseaseIds: ["sore-throat", "cold"],
    graphWeight: 0.79
  },
  {
    id: "oresol",
    name: "Oresol bù nước điện giải",
    brand: "Bù Nước",
    category: "Tiêu hóa",
    ingredient: "ORS",
    price: 22000,
    pack: "Hộp 20 gói",
    stock: 111,
    rating: 4.9,
    badge: "Thiết yếu",
    usage: "Bù nước và điện giải khi tiêu chảy, nôn ói hoặc sốt mất nước.",
    dosage: "Pha đúng tỷ lệ theo hướng dẫn trên gói.",
    caution: "Không pha đặc hơn chỉ dẫn. Trẻ nhỏ cần theo dõi sát dấu hiệu mất nước.",
    symptomTags: ["tiêu chảy", "mất nước", "nôn ói"],
    diseaseIds: ["diarrhea", "fever"],
    graphWeight: 0.91
  },
  {
    id: "loperamide",
    name: "Loperamide 2mg",
    brand: "Êm Bụng",
    category: "Tiêu hóa",
    ingredient: "Loperamide",
    price: 28000,
    pack: "Hộp 2 vỉ x 10 viên",
    stock: 45,
    rating: 4.3,
    badge: "Dùng ngắn ngày",
    usage: "Hỗ trợ giảm tiêu chảy cấp không biến chứng ở người lớn.",
    dosage: "Dùng theo hướng dẫn trên bao bì hoặc theo tư vấn chuyên môn.",
    caution: "Không tự dùng nếu sốt cao, tiêu chảy ra máu hoặc trẻ nhỏ.",
    symptomTags: ["tiêu chảy", "đi ngoài nhiều lần"],
    diseaseIds: ["diarrhea"],
    graphWeight: 0.76
  },
  {
    id: "omeprazole",
    name: "Omeprazole 20mg",
    brand: "Dạ Dày Êm",
    category: "Dạ dày",
    ingredient: "Omeprazole",
    price: 65000,
    pack: "Hộp 14 viên",
    stock: 52,
    rating: 4.7,
    badge: "Giảm acid",
    usage: "Hỗ trợ giảm tiết acid dạ dày trong viêm dạ dày, trào ngược.",
    dosage: "Uống trước ăn sáng theo hướng dẫn chuyên môn.",
    caution: "Không nên tự dùng kéo dài nếu chưa thăm khám.",
    symptomTags: ["ợ nóng", "đau thượng vị", "trào ngược"],
    diseaseIds: ["gastritis"],
    graphWeight: 0.84
  },
  {
    id: "gaviscon",
    name: "Hỗn dịch alginate kháng trào ngược",
    brand: "Chống Trào",
    category: "Dạ dày",
    ingredient: "Natri alginat",
    price: 98000,
    pack: "Chai 150ml",
    stock: 36,
    rating: 4.6,
    badge: "Kháng trào ngược",
    usage: "Tạo lớp màng bảo vệ hỗ trợ giảm ợ nóng và trào ngược nhẹ.",
    dosage: "Dùng sau ăn và trước khi ngủ theo liều khuyến nghị.",
    caution: "Người cần hạn chế natri nên xem kỹ thành phần.",
    symptomTags: ["ợ nóng", "trào ngược", "đau dạ dày"],
    diseaseIds: ["gastritis"],
    graphWeight: 0.82
  },
  {
    id: "benzocaine-lozenge",
    name: "Viên ngậm giảm đau họng",
    brand: "Dịu Họng",
    category: "Tai - Mũi - Họng",
    ingredient: "Benzocaine + Menthol",
    price: 39000,
    pack: "Hộp 24 viên ngậm",
    stock: 89,
    rating: 4.4,
    badge: "Dịu họng",
    usage: "Hỗ trợ làm dịu đau họng, rát họng và khàn tiếng nhẹ.",
    dosage: "Ngậm từ từ 1 viên mỗi 2-3 giờ khi cần.",
    caution: "Không phù hợp cho trẻ rất nhỏ. Ngưng dùng nếu kích ứng.",
    symptomTags: ["đau họng", "rát họng", "khàn tiếng"],
    diseaseIds: ["sore-throat"],
    graphWeight: 0.73
  },
  {
    id: "povidone-gargle",
    name: "Dung dịch súc họng Povidone-Iodine",
    brand: "Súc Họng Sạch",
    category: "Sát khuẩn",
    ingredient: "Povidone-Iodine",
    price: 58000,
    pack: "Chai 125ml",
    stock: 40,
    rating: 4.5,
    badge: "Sát khuẩn",
    usage: "Súc họng sát khuẩn hỗ trợ vệ sinh hầu họng.",
    dosage: "Pha và dùng theo hướng dẫn trên bao bì.",
    caution: "Không dùng kéo dài cho người có bệnh tuyến giáp nếu chưa tư vấn.",
    symptomTags: ["đau họng", "viêm họng", "sát khuẩn miệng"],
    diseaseIds: ["sore-throat"],
    graphWeight: 0.69
  },
  {
    id: "cetirizine",
    name: "Cetirizine 10mg",
    brand: "Mũi Thông",
    category: "Dị ứng",
    ingredient: "Cetirizine",
    price: 27000,
    pack: "Hộp 2 vỉ x 10 viên",
    stock: 58,
    rating: 4.4,
    badge: "Hiệu quả nhanh",
    usage: "Giảm triệu chứng viêm mũi dị ứng như hắt hơi và ngứa mũi.",
    dosage: "Người lớn: 1 viên/ngày.",
    caution: "Có thể gây buồn ngủ ở một số người dùng.",
    symptomTags: ["viêm mũi dị ứng", "ngứa", "hắt hơi"],
    diseaseIds: ["allergy", "rhinitis"],
    graphWeight: 0.81
  },
  {
    id: "zinc",
    name: "Kẽm gluconat",
    brand: "Khoáng Chất Mỗi Ngày",
    category: "Vitamin - khoáng chất",
    ingredient: "Zinc",
    price: 72000,
    pack: "Hộp 30 viên",
    stock: 54,
    rating: 4.2,
    badge: "Bổ sung",
    usage: "Bổ sung kẽm trong chế độ ăn thiếu hụt hoặc giai đoạn phục hồi.",
    dosage: "Dùng theo nhu cầu dinh dưỡng hoặc chỉ định chuyên môn.",
    caution: "Không dùng quá liều kéo dài. Uống cách xa một số kháng sinh.",
    symptomTags: ["suy giảm miễn dịch", "bổ sung", "hỗ trợ phục hồi"],
    diseaseIds: ["cold", "diarrhea"],
    graphWeight: 0.62
  },
  {
    id: "ibuprofen-200",
    name: "Ibuprofen 200mg",
    brand: "Êm Sốt",
    category: "Giảm đau - hạ sốt",
    ingredient: "Ibuprofen",
    price: 26000,
    pack: "Hộp 2 vỉ x 10 viên",
    stock: 88,
    rating: 4.5,
    badge: "Giảm đau",
    usage: "Hỗ trợ giảm đau, hạ sốt và đau nhức cơ mức độ nhẹ đến vừa.",
    dosage: "Người lớn: dùng theo liều khuyến nghị sau ăn.",
    caution: "Không dùng nếu có viêm loét dạ dày, sốt xuất huyết hoặc dị ứng với thuốc kháng viêm.",
    symptomTags: ["sốt", "đau nhức", "đau đầu", "viêm đau"],
    diseaseIds: ["fever", "cold"],
    graphWeight: 0.83
  },
  {
    id: "dextromethorphan-syrup",
    name: "Siro giảm ho Dextromethorphan",
    brand: "Dịu Ho",
    category: "Hô hấp",
    ingredient: "Dextromethorphan",
    price: 48000,
    pack: "Chai 100ml",
    stock: 67,
    rating: 4.3,
    badge: "Ho khan",
    usage: "Hỗ trợ giảm ho khan, ho do kích ứng họng và ho về đêm.",
    dosage: "Dùng theo độ tuổi và hướng dẫn trên bao bì.",
    caution: "Không phù hợp cho ho có đờm đặc hoặc trẻ nhỏ nếu chưa được hướng dẫn.",
    symptomTags: ["ho khan", "rát họng", "ho đêm"],
    diseaseIds: ["cold", "sore-throat"],
    graphWeight: 0.72
  },
  {
    id: "ambroxol-30",
    name: "Ambroxol 30mg",
    brand: "Long Đờm",
    category: "Hô hấp",
    ingredient: "Ambroxol",
    price: 52000,
    pack: "Hộp 2 vỉ x 10 viên",
    stock: 74,
    rating: 4.4,
    badge: "Long đờm",
    usage: "Hỗ trợ làm loãng đờm, giảm cảm giác nặng ngực khi ho có đờm.",
    dosage: "Dùng theo hướng dẫn trên bao bì hoặc tư vấn chuyên môn.",
    caution: "Không phù hợp cho người đang đau dạ dày tiến triển nếu chưa hỏi ý kiến chuyên môn.",
    symptomTags: ["ho đờm", "khó khạc đờm", "nặng ngực"],
    diseaseIds: ["cold", "sore-throat"],
    graphWeight: 0.75
  },
  {
    id: "xylometazoline-spray",
    name: "Xịt mũi Xylometazoline 0.05%",
    brand: "Mũi Dễ Thở",
    category: "Tai - Mũi - Họng",
    ingredient: "Xylometazoline",
    price: 59000,
    pack: "Chai 10ml",
    stock: 49,
    rating: 4.3,
    badge: "Giảm nghẹt mũi",
    usage: "Hỗ trợ giảm nghẹt mũi nhanh trong cảm lạnh hoặc viêm mũi ngắn ngày.",
    dosage: "Dùng ngắn ngày theo hướng dẫn trên bao bì.",
    caution: "Không dùng liên tục quá 5 ngày. Thận trọng ở người tăng huyết áp hoặc bệnh tim mạch.",
    symptomTags: ["nghẹt mũi", "khó thở bằng mũi", "viêm mũi"],
    diseaseIds: ["cold", "rhinitis"],
    graphWeight: 0.77
  },
  {
    id: "fexofenadine-120",
    name: "Fexofenadine 120mg",
    brand: "Thoáng Mũi",
    category: "Dị ứng",
    ingredient: "Fexofenadine",
    price: 56000,
    pack: "Hộp 1 vỉ x 10 viên",
    stock: 63,
    rating: 4.6,
    badge: "Ít buồn ngủ",
    usage: "Giảm triệu chứng viêm mũi dị ứng, ngứa mũi và nổi mề đay nhẹ.",
    dosage: "Người lớn: 1 viên/ngày theo hướng dẫn.",
    caution: "Không tự tăng liều nếu triệu chứng kéo dài. Cần hỏi thêm nếu đang mang thai hoặc cho con bú.",
    symptomTags: ["dị ứng", "ngứa", "hắt hơi", "mề đay"],
    diseaseIds: ["allergy", "rhinitis"],
    graphWeight: 0.84
  },
  {
    id: "chlorpheniramine",
    name: "Chlorpheniramine 4mg",
    brand: "Dịu Dị Ứng",
    category: "Dị ứng",
    ingredient: "Chlorpheniramine",
    price: 18000,
    pack: "Hộp 10 vỉ x 10 viên",
    stock: 121,
    rating: 4.1,
    badge: "Giá tốt",
    usage: "Hỗ trợ giảm hắt hơi, chảy mũi, ngứa và kích ứng do dị ứng.",
    dosage: "Dùng theo liều khuyến nghị trên bao bì.",
    caution: "Có thể gây buồn ngủ. Không phù hợp nếu cần lái xe hoặc làm việc cần tỉnh táo.",
    symptomTags: ["dị ứng", "chảy mũi", "ngứa", "hắt hơi"],
    diseaseIds: ["allergy", "cold"],
    graphWeight: 0.68
  },
  {
    id: "diosmectite",
    name: "Diosmectite gói",
    brand: "Bụng Êm",
    category: "Tiêu hóa",
    ingredient: "Diosmectite",
    price: 41000,
    pack: "Hộp 30 gói",
    stock: 70,
    rating: 4.5,
    badge: "Bảo vệ niêm mạc",
    usage: "Hỗ trợ giảm tiêu chảy và làm dịu kích ứng đường tiêu hóa.",
    dosage: "Pha với nước theo đúng hướng dẫn sử dụng.",
    caution: "Không tự dùng nếu tiêu chảy ra máu, sốt cao hoặc bụng đau dữ dội.",
    symptomTags: ["tiêu chảy", "đau bụng", "rối loạn tiêu hóa"],
    diseaseIds: ["diarrhea"],
    graphWeight: 0.8
  },
  {
    id: "probiotic-caps",
    name: "Men vi sinh hỗ trợ tiêu hóa",
    brand: "Bảo Vệ Ruột",
    category: "Tiêu hóa",
    ingredient: "Probiotic",
    price: 76000,
    pack: "Hộp 20 viên nang",
    stock: 57,
    rating: 4.4,
    badge: "Hỗ trợ hệ ruột",
    usage: "Bổ sung lợi khuẩn hỗ trợ tiêu hóa và phục hồi hệ vi sinh đường ruột.",
    dosage: "Dùng theo hướng dẫn trên nhãn hoặc tư vấn chuyên môn.",
    caution: "Không thay thế bù nước điện giải khi tiêu chảy cấp có dấu hiệu mất nước.",
    symptomTags: ["đầy bụng", "rối loạn tiêu hóa", "tiêu chảy", "men vi sinh"],
    diseaseIds: ["diarrhea", "gastritis"],
    graphWeight: 0.67
  },
  {
    id: "simethicone",
    name: "Simethicone 80mg",
    brand: "Tan Hơi",
    category: "Dạ dày",
    ingredient: "Simethicone",
    price: 34000,
    pack: "Hộp 2 vỉ x 10 viên nhai",
    stock: 66,
    rating: 4.3,
    badge: "Giảm đầy hơi",
    usage: "Hỗ trợ giảm đầy hơi, chướng bụng và cảm giác nặng bụng sau ăn.",
    dosage: "Dùng sau ăn hoặc theo hướng dẫn trên bao bì.",
    caution: "Nếu đau bụng tăng dần hoặc nôn nhiều, không nên tự dùng kéo dài.",
    symptomTags: ["đầy bụng", "chướng bụng", "ợ hơi"],
    diseaseIds: ["gastritis"],
    graphWeight: 0.71
  },
  {
    id: "antacid-tabs",
    name: "Viên nhai trung hòa acid dạ dày",
    brand: "Dạ Dày Dịu",
    category: "Dạ dày",
    ingredient: "Calcium carbonate + Magnesium hydroxide",
    price: 47000,
    pack: "Hộp 24 viên nhai",
    stock: 59,
    rating: 4.4,
    badge: "Giảm ợ nóng",
    usage: "Hỗ trợ giảm ợ nóng, khó tiêu và nóng rát vùng thượng vị sau ăn.",
    dosage: "Nhai theo liều khuyến nghị khi triệu chứng xuất hiện.",
    caution: "Không nên tự dùng kéo dài nếu triệu chứng tái phát thường xuyên.",
    symptomTags: ["ợ nóng", "khó tiêu", "đau thượng vị"],
    diseaseIds: ["gastritis"],
    graphWeight: 0.74
  },
  {
    id: "vitamin-c-500",
    name: "Vitamin C 500mg",
    brand: "Đề Kháng Sáng",
    category: "Vitamin - khoáng chất",
    ingredient: "Vitamin C",
    price: 68000,
    pack: "Hộp 30 viên sủi",
    stock: 83,
    rating: 4.5,
    badge: "Đề kháng",
    usage: "Bổ sung vitamin C hỗ trợ nhu cầu hằng ngày và giai đoạn mệt mỏi, cảm lạnh nhẹ.",
    dosage: "Dùng theo hướng dẫn trên nhãn sản phẩm.",
    caution: "Không lạm dụng liều cao kéo dài. Người có sỏi thận cần xem kỹ thành phần.",
    symptomTags: ["mệt mỏi", "cảm lạnh", "bổ sung", "đề kháng"],
    diseaseIds: ["cold"],
    graphWeight: 0.64
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3 1000 IU",
    brand: "Xương Khỏe",
    category: "Vitamin - khoáng chất",
    ingredient: "Vitamin D3",
    price: 92000,
    pack: "Hộp 60 viên nang mềm",
    stock: 47,
    rating: 4.4,
    badge: "Dùng hằng ngày",
    usage: "Bổ sung vitamin D3 hỗ trợ hấp thu canxi và chăm sóc sức khỏe tổng quát.",
    dosage: "Dùng theo nhu cầu dinh dưỡng hoặc hướng dẫn trên nhãn.",
    caution: "Không tự dùng liều cao kéo dài nếu chưa biết nhu cầu thực tế.",
    symptomTags: ["bổ sung", "phục hồi", "chăm sóc sức khỏe"],
    diseaseIds: ["cold"],
    graphWeight: 0.58
  },
  {
    id: "herbal-lozenge",
    name: "Viên ngậm thảo dược dịu họng",
    brand: "Họng Êm",
    category: "Tai - Mũi - Họng",
    ingredient: "Mật ong + bạc hà + thảo dược",
    price: 35000,
    pack: "Túi 20 viên",
    stock: 95,
    rating: 4.2,
    badge: "Thảo dược",
    usage: "Hỗ trợ làm dịu cổ họng khô rát và hơi khàn tiếng do thời tiết.",
    dosage: "Ngậm từ từ theo nhu cầu trong ngày.",
    caution: "Không thay thế điều trị nếu đau họng kéo dài, sốt cao hoặc nuốt đau nhiều.",
    symptomTags: ["đau họng", "khàn tiếng", "rát họng"],
    diseaseIds: ["sore-throat", "cold"],
    graphWeight: 0.61
  }
];

const DISEASES = [
  {
    id: "cold",
    name: "Cảm lạnh thông thường",
    severity: "Theo dõi tại nhà",
    summary: "Thường gặp với hắt hơi, sổ mũi, hơi sốt, đau đầu nhẹ hoặc mệt mỏi.",
    symptomFocus: ["sổ mũi", "nghẹt mũi", "đau đầu", "mệt mỏi"],
    redFlags: ["Khó thở", "Sốt kéo dài trên 2 ngày", "Đau ngực", "Lơ mơ"],
    homeAdvice: "Nghỉ ngơi, uống đủ nước, làm ẩm không khí và theo dõi thân nhiệt.",
    preferredCategories: ["Giảm đau - hạ sốt", "Tai - Mũi - Họng", "Dị ứng", "Hô hấp"],
    graphIngredients: ["Paracetamol", "Natri clorid", "Loratadine", "Acetylcysteine"]
  },
  {
    id: "fever",
    name: "Sốt nhẹ",
    severity: "Cần theo dõi nhiệt độ",
    summary: "Sốt nhẹ có thể liên quan đến nhiễm siêu vi, cảm cúm hoặc mất nước.",
    symptomFocus: ["sốt", "đau nhức", "mệt", "mất nước"],
    redFlags: ["Sốt trên 39°C", "Co giật", "Khó thở", "Mất nước nặng"],
    homeAdvice: "Mặc thoáng, uống nhiều nước, bù điện giải nếu cần và theo dõi đáp ứng.",
    preferredCategories: ["Giảm đau - hạ sốt", "Tiêu hóa"],
    graphIngredients: ["Paracetamol", "ORS"]
  },
  {
    id: "allergy",
    name: "Dị ứng thời tiết",
    severity: "Theo dõi triệu chứng",
    summary: "Biểu hiện thường là hắt hơi, chảy mũi, ngứa mắt hoặc nổi mề đay nhẹ.",
    symptomFocus: ["hắt hơi", "ngứa", "chảy mũi", "mề đay"],
    redFlags: ["Khó thở", "Phù môi lưỡi", "Choáng", "Mẩn đỏ lan nhanh"],
    homeAdvice: "Tránh tác nhân kích thích, giữ môi trường sạch và theo dõi đáp ứng sau dùng thuốc.",
    preferredCategories: ["Dị ứng"],
    graphIngredients: ["Loratadine", "Cetirizine"]
  },
  {
    id: "rhinitis",
    name: "Viêm mũi kích ứng",
    severity: "Theo dõi tại nhà",
    summary: "Tập trung vào nghẹt mũi, khô mũi, ngứa mũi hoặc kích ứng do thời tiết.",
    symptomFocus: ["nghẹt mũi", "ngứa mũi", "khô mũi"],
    redFlags: ["Đau xoang dữ dội", "Chảy máu kéo dài", "Khó thở", "Sốt cao"],
    homeAdvice: "Vệ sinh mũi thường xuyên, tránh khói bụi và giữ ẩm niêm mạc.",
    preferredCategories: ["Tai - Mũi - Họng", "Dị ứng"],
    graphIngredients: ["Natri clorid", "Cetirizine"]
  },
  {
    id: "gastritis",
    name: "Khó chịu dạ dày - trào ngược",
    severity: "Theo dõi và điều chỉnh ăn uống",
    summary: "Hay gặp cảm giác nóng rát, ợ chua, khó chịu vùng thượng vị sau ăn.",
    symptomFocus: ["ợ nóng", "đau thượng vị", "trào ngược", "đầy bụng"],
    redFlags: ["Nôn ra máu", "Sụt cân", "Đau ngực", "Nuốt nghẹn"],
    homeAdvice: "Ăn thành nhiều bữa nhỏ, tránh đồ cay dầu mỡ và không nằm ngay sau ăn.",
    preferredCategories: ["Dạ dày"],
    graphIngredients: ["Omeprazole", "Sodium alginate"]
  },
  {
    id: "diarrhea",
    name: "Tiêu chảy cấp nhẹ",
    severity: "Ưu tiên bù nước",
    summary: "Có thể gặp đi ngoài nhiều lần, đau bụng quặn nhẹ, mệt hoặc mất nước.",
    symptomFocus: ["tiêu chảy", "mất nước", "đau bụng"],
    redFlags: ["Đi ngoài ra máu", "Sốt cao", "Khát nhiều", "Lơ mơ"],
    homeAdvice: "Bù nước điện giải sớm, ăn nhẹ, theo dõi số lần đi ngoài và dấu hiệu mất nước.",
    preferredCategories: ["Tiêu hóa", "Vitamin - khoáng chất"],
    graphIngredients: ["ORS", "Loperamide", "Zinc"]
  },
  {
    id: "sore-throat",
    name: "Đau họng",
    severity: "Theo dõi triệu chứng",
    summary: "Rát họng, đau khi nuốt, khàn tiếng hoặc tăng tiết đờm.",
    symptomFocus: ["đau họng", "rát họng", "khàn tiếng", "ho đờm"],
    redFlags: ["Khó thở", "Sốt cao", "Nuốt đau nhiều", "Sưng hạch to kéo dài"],
    homeAdvice: "Uống ấm, giữ ẩm họng, tránh đồ kích thích và nghỉ ngơi đầy đủ.",
    preferredCategories: ["Tai - Mũi - Họng", "Hô hấp", "Sát khuẩn"],
    graphIngredients: ["Benzocaine + Menthol", "Povidone-Iodine", "Acetylcysteine"]
  }
];

const QUICK_SEARCHES = [
  "Paracetamol",
  "Dị ứng thời tiết",
  "Đau họng",
  "Oresol",
  "Trào ngược",
  "Xịt mũi"
];

const MEGA_CATEGORIES = [
  {
    id: "thuoc",
    name: "Thuốc",
    subtitle: "Danh mục được xem nhiều",
    description:
      "Tập trung các nhóm thuốc phổ biến để người dùng đi nhanh từ danh mục sang sản phẩm cụ thể.",
    tiles: [
      {
        title: "Thuốc không kê đơn",
        note: "Thuốc thường dùng",
        thumb: "OTC",
        accent: "linear-gradient(145deg, #d9ecff, #f5fbff)"
      },
      {
        title: "Thuốc kê đơn",
        note: "Kiểm tra chỉ định",
        thumb: "RX",
        accent: "linear-gradient(145deg, #e6e4ff, #f8f7ff)"
      },
      {
        title: "Thuốc ho và hô hấp",
        note: "Mùa lạnh, đờm, rát họng",
        thumb: "AIR",
        accent: "linear-gradient(145deg, #def8ea, #f4fff9)"
      },
      {
        title: "Vitamin và khoáng chất",
        note: "Bổ sung hàng ngày",
        thumb: "VIT",
        accent: "linear-gradient(145deg, #fff1cf, #fffaf0)"
      },
      {
        title: "Xem tất cả",
        note: "Mở rộng toàn bộ danh mục",
        thumb: "ALL",
        accent: "linear-gradient(145deg, #e7efff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Ưu đãi nhóm thuốc",
      title: "Combo tủ thuốc gia đình",
      copy: "Giảm theo cụm nhu cầu: sốt, cảm lạnh, tiêu hóa và dị ứng.",
      cta: "Khám phá combo",
      accent: "linear-gradient(180deg, #f2f8df 0%, #d7efb3 100%)",
      badge: "Giảm đến 18%"
    }
  },
  {
    id: "disease-lookup",
    name: "Tra cứu bệnh",
    subtitle: "Tìm nhanh theo triệu chứng",
    description:
      "Chuyển từ bệnh hoặc triệu chứng sang nhóm thuốc gợi ý, cảnh báo và lời khuyên theo dõi.",
    tiles: [
      {
        title: "Cảm lạnh thông thường",
        note: "Sổ mũi, nghẹt mũi, mệt",
        thumb: "COLD",
        accent: "linear-gradient(145deg, #e8f1ff, #ffffff)"
      },
      {
        title: "Dị ứng thời tiết",
        note: "Ngứa, hắt hơi, nổi mề đay",
        thumb: "ALLG",
        accent: "linear-gradient(145deg, #eefbe8, #fcfffb)"
      },
      {
        title: "Tiêu chảy cấp nhẹ",
        note: "Ưu tiên bù nước",
        thumb: "ORS",
        accent: "linear-gradient(145deg, #fff0db, #fffaf3)"
      },
      {
        title: "Đau họng",
        note: "Rát họng, khàn tiếng",
        thumb: "ENT",
        accent: "linear-gradient(145deg, #ede6ff, #faf7ff)"
      },
      {
        title: "Tư vấn theo bệnh",
        note: "Xem gợi ý phù hợp",
        thumb: "AI",
        accent: "linear-gradient(145deg, #dff8ff, #f8feff)"
      }
    ],
    promo: {
      kicker: "Tra cứu thông minh",
      title: "Bệnh, triệu chứng và thuốc trên một luồng",
      copy: "Giúp khách hàng đi nhanh từ triệu chứng sang nhóm sản phẩm phù hợp để tham khảo.",
      cta: "Mở khu tư vấn",
      accent: "linear-gradient(180deg, #e9f1ff 0%, #c7dafd 100%)",
      badge: "Tìm nhanh"
    }
  },
  {
    id: "supplement",
    name: "Thực phẩm bảo vệ sức khỏe",
    subtitle: "Bổ sung và chăm sóc dự phòng",
    description:
      "Nhóm sản phẩm hỗ trợ miễn dịch, tiêu hóa, giấc ngủ và phục hồi với luồng lọc theo nhu cầu.",
    tiles: [
      {
        title: "Miễn dịch và đề kháng",
        note: "Kẽm, vitamin C, men vi sinh",
        thumb: "IMM",
        accent: "linear-gradient(145deg, #fff1cc, #fffaf0)"
      },
      {
        title: "Hỗ trợ tiêu hóa",
        note: "Men vi sinh, chất xơ, ORS",
        thumb: "GUT",
        accent: "linear-gradient(145deg, #e8fff1, #f8fffb)"
      },
      {
        title: "Giấc ngủ và thư giãn",
        note: "Magie, trà thảo mộc",
        thumb: "REST",
        accent: "linear-gradient(145deg, #ece9ff, #faf9ff)"
      },
      {
        title: "Tim mạch và chuyển hóa",
        note: "Omega, chất chống oxy hóa",
        thumb: "CARD",
        accent: "linear-gradient(145deg, #dff5ff, #f8fdff)"
      },
      {
        title: "Xem toàn bộ",
        note: "Theo độ tuổi và nhu cầu",
        thumb: "FULL",
        accent: "linear-gradient(145deg, #ecf1ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Bổ sung chủ động",
      title: "Sản phẩm hỗ trợ theo nhu cầu sống khỏe",
      copy: "Có thể nhóm tiếp theo độ tuổi, chế độ ăn và lịch sử mua hàng.",
      cta: "Xem sản phẩm",
      accent: "linear-gradient(180deg, #eefadf 0%, #ddf2bd 100%)",
      badge: "Bộ lọc theo mục tiêu"
    }
  },
  {
    id: "personal-care",
    name: "Chăm sóc cá nhân",
    subtitle: "Routine hàng ngày",
    description:
      "Bổ sung các nhóm vệ sinh, chăm sóc răng miệng, da và phụ kiện y tế tiêu dùng nhanh.",
    tiles: [
      {
        title: "Răng miệng",
        note: "Kem đánh răng, nước súc miệng",
        thumb: "CARE",
        accent: "linear-gradient(145deg, #e1f4ff, #fbfeff)"
      },
      {
        title: "Vệ sinh tay và sát khuẩn",
        note: "Gel rửa tay, xịt sát khuẩn",
        thumb: "SAFE",
        accent: "linear-gradient(145deg, #eefbe8, #fbfffc)"
      },
      {
        title: "Chăm sóc da cơ bản",
        note: "Sữa rửa mặt, dưỡng ẩm",
        thumb: "SKIN",
        accent: "linear-gradient(145deg, #fff0e5, #fffaf7)"
      },
      {
        title: "Băng cá nhân",
        note: "Gạc, băng dán, găng tay",
        thumb: "KIT",
        accent: "linear-gradient(145deg, #ebe8ff, #f9f8ff)"
      },
      {
        title: "Mua nhanh",
        note: "Top sản phẩm tiện lợi",
        thumb: "GO",
        accent: "linear-gradient(145deg, #edf4ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Routine hàng ngày",
      title: "Chăm sóc cá nhân gọn trong một dòng trải nghiệm",
      copy: "Tối ưu cho luồng mua lặp lại và gợi ý add-on theo giỏ hàng.",
      cta: "Xem routine",
      accent: "linear-gradient(180deg, #fff6df 0%, #ffe8bc 100%)",
      badge: "Gợi ý theo giỏ hàng"
    }
  },
  {
    id: "mother-baby",
    name: "Mẹ và bé",
    subtitle: "Nhu cầu chăm sóc riêng",
    description:
      "Danh mục riêng cho mẹ sau sinh, trẻ nhỏ và sản phẩm chăm sóc thiết yếu theo lứa tuổi.",
    tiles: [
      {
        title: "Sữa và dinh dưỡng",
        note: "Theo giai đoạn phát triển",
        thumb: "KID",
        accent: "linear-gradient(145deg, #fff1d7, #fffaf2)"
      },
      {
        title: "Tắm gội dịu nhẹ",
        note: "Da nhạy cảm",
        thumb: "BABY",
        accent: "linear-gradient(145deg, #e9f9ff, #fbfeff)"
      },
      {
        title: "Tã bỉm",
        note: "Theo cân nặng",
        thumb: "SOFT",
        accent: "linear-gradient(145deg, #eef7e6, #fcfffb)"
      },
      {
        title: "Vitamin cho bé",
        note: "Theo dõi liều dùng",
        thumb: "MINI",
        accent: "linear-gradient(145deg, #f0ebff, #fcfbff)"
      },
      {
        title: "Mở toàn bộ",
        note: "Xem theo độ tuổi",
        thumb: "AGE",
        accent: "linear-gradient(145deg, #eef2ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Chăm sóc mẹ và bé",
      title: "Nhóm sản phẩm thiết yếu theo độ tuổi",
      copy: "Phù hợp để thêm filter cân nặng, tháng tuổi và nhắc lịch mua lại.",
      cta: "Mở danh mục mẹ bé",
      accent: "linear-gradient(180deg, #fff4d9 0%, #ffe6af 100%)",
      badge: "Theo độ tuổi"
    }
  },
  {
    id: "beauty",
    name: "Chăm sóc sắc đẹp",
    subtitle: "Chăm sóc da và sắc đẹp",
    description:
      "Kết hợp dược mỹ phẩm, chống nắng và phục hồi da trong cùng một khu danh mục trực quan.",
    tiles: [
      {
        title: "Dược mỹ phẩm",
        note: "Da dầu, da nhạy cảm",
        thumb: "DERM",
        accent: "linear-gradient(145deg, #e5f6ff, #fbfeff)"
      },
      {
        title: "Chống nắng",
        note: "Dùng hằng ngày",
        thumb: "UV",
        accent: "linear-gradient(145deg, #fff2cf, #fffbf2)"
      },
      {
        title: "Phục hồi da",
        note: "Dưỡng ẩm và làm dịu",
        thumb: "CALM",
        accent: "linear-gradient(145deg, #edfbe8, #fbfffc)"
      },
      {
        title: "Làm sạch",
        note: "Routine sáng tối",
        thumb: "CLEAN",
        accent: "linear-gradient(145deg, #efe9ff, #fbfaff)"
      },
      {
        title: "Xem thêm",
        note: "Theo loại da",
        thumb: "TYPE",
        accent: "linear-gradient(145deg, #edf3ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Chăm sóc sắc đẹp",
      title: "Danh mục dược mỹ phẩm dễ chọn theo nhu cầu làn da",
      copy: "Khách hàng có thể xem nhanh theo loại da, mức dưỡng ẩm và mục tiêu chăm sóc.",
      cta: "Khám phá sản phẩm",
      accent: "linear-gradient(180deg, #f7f0ff 0%, #e6dbff 100%)",
      badge: "Chọn theo loại da"
    }
  },
  {
    id: "medical-device",
    name: "Thiết bị y tế",
    subtitle: "Theo dõi và kiểm tra tại nhà",
    description:
      "Các nhóm nhiệt kế, máy đo huyết áp, test nhanh và phụ kiện theo dõi sức khỏe gia đình.",
    tiles: [
      {
        title: "Máy đo huyết áp",
        note: "Theo dõi tại nhà",
        thumb: "BPM",
        accent: "linear-gradient(145deg, #e6f4ff, #fbfeff)"
      },
      {
        title: "Nhiệt kế",
        note: "Điện tử và hồng ngoại",
        thumb: "TEMP",
        accent: "linear-gradient(145deg, #fff0db, #fffaf4)"
      },
      {
        title: "Test nhanh",
        note: "Sàng lọc tại chỗ",
        thumb: "TEST",
        accent: "linear-gradient(145deg, #eefbe8, #fcfffb)"
      },
      {
        title: "Dụng cụ sơ cứu",
        note: "Bộ y tế mini",
        thumb: "KIT",
        accent: "linear-gradient(145deg, #eee9ff, #fbfaff)"
      },
      {
        title: "Xem thiết bị",
        note: "Theo dõi sức khỏe",
        thumb: "MED",
        accent: "linear-gradient(145deg, #ecf2ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Theo dõi sức khỏe",
      title: "Thiết bị y tế cho theo dõi sức khỏe tại nhà",
      copy: "Phù hợp để thêm trạng thái bảo hành, chứng nhận và dữ liệu kỹ thuật chi tiết.",
      cta: "Xem thiết bị",
      accent: "linear-gradient(180deg, #e6f5ff 0%, #cfe9ff 100%)",
      badge: "Dùng tại nhà"
    }
  },
  {
    id: "daily-essentials",
    name: "Sản phẩm tiện lợi",
    subtitle: "Mua nhanh, dùng thường xuyên",
    description:
      "Nhóm hàng tiêu dùng nhanh, vật tư và add-on để tăng giá trị giỏ hàng ngay trên homepage.",
    tiles: [
      {
        title: "Khẩu trang",
        note: "Dùng hằng ngày",
        thumb: "MASK",
        accent: "linear-gradient(145deg, #eaf5ff, #fbfeff)"
      },
      {
        title: "Khăn giấy ướt",
        note: "Tiện lợi mang theo",
        thumb: "WET",
        accent: "linear-gradient(145deg, #fff4dc, #fffbf5)"
      },
      {
        title: "Bông gòn và gạc",
        note: "Sơ cứu và vệ sinh",
        thumb: "COT",
        accent: "linear-gradient(145deg, #eefbe8, #fbfffc)"
      },
      {
        title: "Nước muối sinh lý",
        note: "Dùng đa mục đích",
        thumb: "SALT",
        accent: "linear-gradient(145deg, #f0ebff, #fbfaff)"
      },
      {
        title: "Mua nhanh",
        note: "Top hàng tiện lợi",
        thumb: "FAST",
        accent: "linear-gradient(145deg, #edf3ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Mua nhanh",
      title: "Các sản phẩm tiện lợi để tăng chuyển đổi giỏ hàng",
      copy: "Hợp cho cụm cross-sell, mua lại định kỳ và gợi ý theo combo.",
      cta: "Xem sản phẩm tiện lợi",
      accent: "linear-gradient(180deg, #fff5dd 0%, #ffe6bb 100%)",
      badge: "Thêm vào giỏ hàng"
    }
  },
  {
    id: "business",
    name: "Chăm sóc người lớn tuổi",
    subtitle: "Sản phẩm phù hợp gia đình có người cao tuổi",
    description:
      "Gợi ý các nhóm sản phẩm đo huyết áp, hỗ trợ xương khớp và chăm sóc hằng ngày cho người lớn tuổi.",
    tiles: [
      {
        title: "Máy đo huyết áp",
        note: "Theo dõi thường xuyên",
        thumb: "ÁP",
        accent: "linear-gradient(145deg, #e8f2ff, #fbfeff)"
      },
      {
        title: "Hỗ trợ xương khớp",
        note: "Chăm sóc mỗi ngày",
        thumb: "KHỚP",
        accent: "linear-gradient(145deg, #eefbe8, #fcfffb)"
      },
      {
        title: "Vitamin cho người lớn tuổi",
        note: "Bổ sung thuận tiện",
        thumb: "VTM",
        accent: "linear-gradient(145deg, #fff2d7, #fffbf4)"
      },
      {
        title: "Sản phẩm tiện ích",
        note: "Dễ dùng tại nhà",
        thumb: "TIỆN",
        accent: "linear-gradient(145deg, #f0ebff, #fbfaff)"
      },
      {
        title: "Xem thêm",
        note: "Sản phẩm được quan tâm",
        thumb: "XEM",
        accent: "linear-gradient(145deg, #edf3ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Chăm sóc cả nhà",
      title: "Danh mục dành cho gia đình có người lớn tuổi",
      copy: "Giúp khách hàng mua nhanh sản phẩm theo nhu cầu chăm sóc sức khỏe tại nhà.",
      cta: "Xem sản phẩm phù hợp",
      accent: "linear-gradient(180deg, #e9efff 0%, #d6e0ff 100%)",
      badge: "Dễ chọn"
    }
  },
  {
    id: "house-brand",
    name: "Thương hiệu được yêu thích",
    subtitle: "Sản phẩm nổi bật trong tháng",
    description:
      "Tổng hợp các nhóm sản phẩm được khách hàng quan tâm nhiều và đang có ưu đãi nổi bật.",
    tiles: [
      {
        title: "Bộ giảm đau cơ bản",
        note: "Sản phẩm nổi bật",
        thumb: "NX1",
        accent: "linear-gradient(145deg, #e7f4ff, #fbfeff)"
      },
      {
        title: "Hỗ trợ miễn dịch",
        note: "Kẽm và vitamin",
        thumb: "NX2",
        accent: "linear-gradient(145deg, #fff0d6, #fffaf4)"
      },
      {
        title: "Vệ sinh hàng ngày",
        note: "Care essentials",
        thumb: "NX3",
        accent: "linear-gradient(145deg, #eefbe8, #fbfffc)"
      },
      {
        title: "Mẹ và bé",
        note: "Dòng dịu nhẹ",
        thumb: "NX4",
        accent: "linear-gradient(145deg, #efe9ff, #fbfaff)"
      },
      {
        title: "Xem thêm sản phẩm",
        note: "Tất cả sản phẩm nổi bật",
        thumb: "NX",
        accent: "linear-gradient(145deg, #edf2ff, #ffffff)"
      }
    ],
    promo: {
      kicker: "Ưu đãi nổi bật",
      title: "Sản phẩm được khách hàng quan tâm nhiều trong thời gian gần đây",
      copy: "Hiển thị rõ ưu đãi, quà tặng và các sản phẩm nên mua cùng để khách hàng dễ chọn.",
      cta: "Xem ưu đãi",
      accent: "linear-gradient(180deg, #eaf7e8 0%, #d8f0d2 100%)",
      badge: "Được yêu thích"
    }
  }
];

const HERO_BANNERS = [
  {
    kicker: "Mùa giao mùa",
    title: "Combo cảm lạnh, đau họng và dị ứng cho tủ thuốc gia đình",
    copy: "Ưu đãi cho gia đình trong mùa giao mùa với các sản phẩm được nhiều khách hàng tìm mua.",
    cta: "Xem combo theo triệu chứng",
    badge: "Giảm đến 20%",
    tone: "linear-gradient(135deg, #0f3ea8 0%, #2f74ff 55%, #8bc4ff 100%)",
    image: "banner/1.jpg"
  },
  {
    kicker: "Mua sắm tiện lợi",
    title: "Từ banner ưu đãi đi thẳng tới sản phẩm, giỏ hàng và phần tư vấn phù hợp",
    copy: "Khách hàng có thể tìm nhanh sản phẩm, xem cảnh báo an toàn và thêm ngay vào giỏ hàng.",
    cta: "Mở kho thuốc",
    badge: "Tìm và mua ngay",
    tone: "linear-gradient(135deg, #0e5d56 0%, #22b1a0 55%, #baf1e8 100%)",
    image: "banner/2.jpg"
  },
  {
    kicker: "Chăm sóc sức khỏe tại nhà",
    title: "Nhắc khách hàng chú ý khi tự dùng thuốc và khi nào nên đi khám",
    copy: "Hiển thị rõ các dấu hiệu cần cẩn trọng để khách hàng yên tâm hơn khi mua sắm.",
    cta: "Xem tư vấn an toàn",
    badge: "An tâm hơn",
    tone: "linear-gradient(135deg, #5a2f9c 0%, #8c5cff 50%, #d2c0ff 100%)",
    image: "banner/3.jpg"
  }
];

const INLINE_BANNERS = [
  {
    kicker: "Ưu đãi nhanh 01",
    title: "Top sản phẩm giảm đau, hạ sốt và ORS cho nhu cầu cấp tốc",
    copy: "Hiển thị giữa trang để khách hàng xem nhanh nhóm sản phẩm cần mua gấp.",
    cta: "Xem nhanh",
    badge: "Chọn mua nhanh",
    tone: "linear-gradient(135deg, #163f9b 0%, #2a6dff 100%)",
    image: "banner/1.jpg"
  },
  {
    kicker: "Ưu đãi nhanh 02",
    title: "Mẹ và bé, dược mỹ phẩm, chăm sóc cá nhân được tách rõ theo mục tiêu",
    copy: "Giúp khách hàng nhìn rõ từng nhóm sản phẩm theo nhu cầu chăm sóc trong gia đình.",
    cta: "Xem danh mục",
    badge: "Nhiều danh mục",
    tone: "linear-gradient(135deg, #8a4a0d 0%, #ff9b26 100%)",
    image: "banner/2.jpg"
  },
  {
    kicker: "Ưu đãi nhanh 03",
    title: "Tư vấn an toàn trước khi mua giúp khách hàng yên tâm hơn khi chọn sản phẩm",
    copy: "Nhắc các dấu hiệu cần chú ý trước khi tự dùng thuốc tại nhà.",
    cta: "Mở tư vấn",
    badge: "An toàn hơn",
    tone: "linear-gradient(135deg, #0f6a53 0%, #20b67f 100%)",
    image: "banner/3.jpg"
  }
];

const PATIENT_FLAGS = [
  {
    id: "pregnant",
    label: "Mang thai / cho con bú",
    description: "Cần thận trọng khi tư vấn và tự dùng thuốc.",
    severity: "caution",
    keywords: ["mang thai", "cho con bu", "sau sinh"]
  },
  {
    id: "child",
    label: "Trẻ nhỏ",
    description: "Cần kiểm tra độ tuổi và dạng bào chế.",
    severity: "caution",
    keywords: ["tre nho", "em be", "duoi 6 tuoi", "duoi 2 tuoi"]
  },
  {
    id: "liver",
    label: "Bệnh gan",
    description: "Nhiều thuốc cần giảm liều hoặc tránh tự dùng.",
    severity: "danger",
    keywords: ["benh gan", "suy gan", "gan yeu"]
  },
  {
    id: "thyroid",
    label: "Bệnh tuyến giáp",
    description: "Cần thận trọng với các sản phẩm có iod.",
    severity: "caution",
    keywords: ["tuyen giap", "cuong giap", "suy giap"]
  },
  {
    id: "high-fever",
    label: "Sốt cao trên 39°C",
    description: "Là dấu hiệu cần được đánh giá thêm.",
    severity: "danger",
    keywords: ["sot cao", "39 do", "tren 39", "sot 40"]
  },
  {
    id: "blood-stool",
    label: "Tiêu chảy ra máu",
    description: "Không nên tự xử trí hoàn toàn tại nhà.",
    severity: "danger",
    keywords: ["ra mau", "phan mau", "tieu chay ra mau"]
  },
  {
    id: "breathing",
    label: "Khó thở / đau ngực",
    description: "Cần đi khám gấp ngay.",
    severity: "danger",
    keywords: ["kho tho", "dau nguc", "tho rit", "hut hoi"]
  }
];

const SCENARIO_EXAMPLES = [
  "Tôi tự lên đơn thuốc nhưng thuốc này cần kê toa.",
  "Tôi nghĩ mình bị cảm lạnh, muốn tự mua Paracetamol và xịt mũi nước muối.",
  "Tôi uống Panadol kết hợp với Alexan có được không?",
  "Trẻ nhỏ đau họng, tôi muốn dùng viên ngậm giảm đau họng.",
  "Tôi bị tiêu chảy nhưng đang sốt cao và muốn tự dùng Loperamide.",
  "Tôi có bệnh gan, muốn dùng Paracetamol để hạ sốt."
];

const MEDICINE_ALIASES = {
  paracetamol: "para-500",
  panadol: "para-500",
  loratadine: "loratadine",
  cetirizine: "cetirizine",
  oresol: "oresol",
  ors: "oresol",
  loperamide: "loperamide",
  omeprazole: "omeprazole",
  gaviscon: "gaviscon",
  acetylcysteine: "acetylcysteine",
  "xit mui": "saline-spray",
  "nuoc muoi": "saline-spray",
  "vien ngam": "benzocaine-lozenge",
  "povidone iodine": "povidone-gargle",
  alexan: "external-alexan"
};

const EXTERNAL_REFERENCE_PRODUCTS = [
  {
    id: "external-alexan",
    name: "Alexan",
    verified: false,
    caution:
      "Sản phẩm này chưa có hồ sơ thành phần được xác minh trong dữ liệu hiện tại, nên chưa thể kết luận an toàn khi phối hợp."
  }
];

const COMBINATION_RULES = [
  {
    ids: ["oresol", "zinc"],
    level: "safe",
    reason: "Cặp này cùng hướng tới hỗ trợ tiêu chảy nhẹ và bổ sung trong trường hợp cần thiết.",
    advice: "Vẫn cần pha Oresol đúng tỉ lệ và theo dõi dấu hiệu mất nước."
  },
  {
    ids: ["loratadine", "saline-spray"],
    level: "safe",
    reason: "Một thuốc dị ứng và một sản phẩm vệ sinh mũi, không trùng hoạt chất trong dữ liệu hiện có.",
    advice: "Phù hợp để tham khảo trong trường hợp viêm mũi kích ứng nhẹ nếu không có dấu hiệu nguy hiểm."
  },
  {
    ids: ["para-500", "saline-spray"],
    level: "safe",
    reason: "Không trùng hoạt chất; một bên hỗ trợ hạ sốt, giảm đau, một bên vệ sinh mũi.",
    advice: "Chỉ nên dùng khi triệu chứng phù hợp và theo đúng liều tham khảo."
  },
  {
    ids: ["para-500", "external-alexan"],
    level: "caution",
    reason: "Dữ liệu hiện tại chỉ xác minh Paracetamol, còn Alexan chưa có thành phần được đối chiếu đầy đủ.",
    advice: "Cần đọc kỹ nhãn thật của Alexan hoặc hỏi dược sĩ trước khi kết hợp."
  }
];

const CUSTOMER_NOTIFICATIONS = [
  {
    id: "notice-1",
    title: "Đơn hàng đang giao",
    body: "Đơn hàng gồm Paracetamol 500mg và Oresol đang được giao đến địa chỉ của bạn.",
    time: "5 phút trước"
  },
  {
    id: "notice-2",
    title: "Ưu đãi hôm nay",
    body: "Giảm 15% cho nhóm sản phẩm cảm lạnh, dị ứng và chăm sóc mũi họng.",
    time: "30 phút trước"
  },
  {
    id: "notice-3",
    title: "Nhắc mua lại",
    body: "Một số sản phẩm chăm sóc cá nhân trong giỏ hàng của bạn sắp hết khuyến mãi.",
    time: "1 giờ trước"
  }
];

const SAMPLE_CUSTOMER = {
  name: "Nguyễn Minh Anh",
  phone: "0988 123 456",
  email: "minhanh@antam.vn",
  membership: "Thành viên Bạc",
  points: 240,
  address: "18 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh",
  birthday: "12/09/1997"
};

const SAMPLE_ORDERS = [
  {
    id: "ĐH1024",
    status: "Đang giao",
    total: 126000,
    items: "Paracetamol 500mg, Oresol bù nước điện giải"
  },
  {
    id: "ĐH0978",
    status: "Đã giao",
    total: 173000,
    items: "Loratadine 10mg, Xịt mũi Natri Clorid 0.9%"
  },
  {
    id: "ĐH0941",
    status: "Đã giao",
    total: 98000,
    items: "Hỗn dịch alginate kháng trào ngược"
  }
];
