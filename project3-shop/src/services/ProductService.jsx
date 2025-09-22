import axios from "axios";

const API_URL1 = "https://codingapple1.github.io/shop/data2.json";
const API_URL2 = "https://codingapple1.github.io/shop/data3.json";


// 상품 데이터 가져오기 함수
export async function fetchProducts() {
  try {
    const responses = await Promise.all( [axios.get(API_URL1), axios.get(API_URL2)] )
     // 두 JSON 데이터를 하나로 합치기
    const data1 = responses[0].data;
    const data2 = responses[1].data;

    return [...data1, ...data2]; // 배열 합쳐서 반환
  } catch (error) {
    console.error("상품 데이터를 불러오는 중 오류 발생:", error);
    throw error;
  }
}