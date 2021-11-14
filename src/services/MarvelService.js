

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=b46cb10af69442a494452cce291a4ff4';

    _baseOffset = 210;
    getResourse = async (url) => {
        let res = await fetch(url);
    
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = async(offset = this._baseOffset) => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async(id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?&${this._apiKey}`)
        return this._transformCharacter(res.data.results[0]);
    }
    _transformCharacter = (char) => {
        if (!char.description){
            char.description = "Sorry, there is no description."
        }
        if (char.description.length > 220){
            let limitOfSymbols = char.description.slice(0, 220);
            char.description = limitOfSymbols.slice(0, limitOfSymbols.lastIndexOf(' ')) + "..."
        } 

        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' +  char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }
}

export default MarvelService;