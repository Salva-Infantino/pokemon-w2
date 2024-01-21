const About = ({pokemon}) => {

        const getFirstWord = (sentence) => {
            // Remove leading and trailing spaces from the string
            sentence = sentence.trim();

            // Find the index of the first space
            const firstSpaceIndex = sentence.indexOf(' ');

            if (firstSpaceIndex === -1) {
                // If no space is found, return the entire sentence
                return sentence;
            } else {
                // If a space is found, extract the first word
                const firstWord = sentence.substring(0, firstSpaceIndex);
                return firstWord;
            }
        }

        return (
            <div className="About">
                <div className="d-flex mb-2">
                    <div className="text-secondary w-35">Category</div>
                    <div>{pokemon.Category}</div>
                </div>
                <div className="d-flex mb-2">
                    <div className="text-secondary w-35">Height</div>
                    <div>{pokemon.Height}</div>
                </div>
                <div className="d-flex mb-2">
                    <div className="text-secondary w-35">Weight</div>
                    <div>{pokemon.Weight}</div>
                </div>
                <div className="d-flex mb-2">
                    <div className="text-secondary w-35">Ability</div>
                    <div>{getFirstWord(pokemon.Ability)}</div>
                </div>
            </div>
        )
}

export default About;