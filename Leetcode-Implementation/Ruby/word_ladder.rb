require 'set'

# @param {String} begin_word
# @param {String} end_word
# @param {Set<String>} word_dict
# @return {Integer}
def ladder_length(begin_word, end_word, word_dict)
  # use breath first search to get adjacent list words
  # delete from dict every time a word found, avoid revisit

  word_dict.add(end_word)
  level_list = [begin_word]
  length = 1

  while level_list.length != 0
    # look for adjacent words
    result = look_for_word(level_list, word_dict, end_word)
    found, level_list = result[0], result[1]
    length += 1
    return length if found
  end
  return false
end

def look_for_word(word_list, dict, end_word)
  # find adjacent word list, return [#{found}, adjacent_list]
  # delete word found in dict

  adjacent_list = []

  for word in word_list
    result = get_adjacent_words(word, end_word, dict)
    found, adjacent_words = result[0], result[1]
    return result if found
    adjacent_list.concat(adjacent_words)
  end

  return [false, adjacent_list]
end

def get_adjacent_words(word, end_word, dict)
  # return all possible words list expect for itself
  word_list = []
  index = 0
  while index < word.length
    for new_char in 'a'..'z'
      step_word = word.dup
      step_word[index] = new_char
      if dict.include?(step_word) and new_char != word[index]
        return [true, []] if step_word == end_word
        word_list.push(step_word)
        dict.delete(step_word)
      end
    end
    index += 1
  end
  [false, word_list]
end

puts ladder_length("hit", "cog", ["hot","dot","dog","lot","log"].to_set)


# bidirectional BFS, always search the less set between front and end
