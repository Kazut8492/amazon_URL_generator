import { useState } from 'react';
import './App.css';
import { callChatGPT } from './ChatGPTService';

function App() {
  const [formState, setFormState] = useState({
    keyword: '',
    language: '',
    category: '',
    primeShipping: false,
    priceRange: '',
    minRating: '',
    minReviews: '',
    options: '',
  });

  const [generatedURL, setGeneratedURL] = useState('');

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `Amazon商品検索ジェネレーターへようこそ! 以下の情報を提供していただければ、あなたの興味に合った商品を探すためのカスタム検索URLを生成します。

                    検索キーワード：${formState.keyword}（必須）
                    検索対象言語：${formState.language}（任意）
                    検索対象カテゴリー：${formState.category}（必須）
                    プライム会員向けの無料配送を有効にする場合は、有効にする：${formState.primeShipping ? 'はい' : 'いいえ'}（任意）
                    検索対象の商品価格範囲：${formState.priceRange}（任意）
                    検索対象の商品平均評価の最小値：${formState.minRating}（任意）
                    検索対象の商品レビュー数の最小値：${formState.minReviews}（任意）
                    提供された情報に基づき、あなたの興味に合った商品を探すためのカスタム検索URLを生成します。情報を提供してください。`;
    const url = await callChatGPT([{role:"user", content: prompt}], {temperature: 0.8, max_tokens: 100,});
    console.log(url)
    setGeneratedURL(url[0].message.content);
                  
  };

  return (
  <div className="App">
  <h1>Amazon Search URL Generator</h1>
  <form onSubmit={handleSubmit}>
  <label>
  Keyword:
  <input
           type="text"
           name="keyword"
           value={formState.keyword}
           onChange={handleInputChange}
           required
         />
  </label>
  <br />
  <label>
  Language:
  <input
           type="text"
           name="language"
           value={formState.language}
           onChange={handleInputChange}
         />
  </label>
  <br />
  <label>
  Category:
  <input
           type="text"
           name="category"
           value={formState.category}
           onChange={handleInputChange}
         />
  </label>
  <br />
  <label>
  Prime Shipping:
  <input
           type="checkbox"
           name="primeShipping"
           checked={formState.primeShipping}
           onChange={handleInputChange}
         />
  </label>
  <br />
  <label>
  Price Range:
  <input
           type="text"
           name="priceRange"
           value={formState.priceRange}
           onChange={handleInputChange}
         />
  </label>
  <br />
  <label>
  Minimum Rating:
  <input
           type="number"
           name="minRating"
           value={formState.minRating}
           onChange={handleInputChange}
         />
  </label>
  <br />
  <label>
  Minimum Reviews:
  <input
           type="number"
           name="minReviews"
           value={formState.minReviews}
           onChange={handleInputChange}
         />
  </label>
  <br />
  <label>
  Additional Options:
  <textarea
           name="options"
           value={formState.options}
           onChange={handleInputChange}
         />
  </label>
  <br />
  <button type="submit">Generate URL</button>
  </form>
  {generatedURL && (
  <>
  <h2>Generated URL:</h2>
  <p>{generatedURL}</p>
  </>
  )}
  </div>
  );
  }
  
  export default App;