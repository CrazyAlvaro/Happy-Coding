

public class StringsForEach {
    public static boolean hasLetter(String word, char letter) {
        for(char c : word.toCharArray()) {
        	// Char is primitive type, == directly compares values in Memory
        	// While equals is usually a class method, compares two instances 
            if(c == letter) {
                return true;
            }
        }
        return false;
    }
    
    public static String replace(String word, char gone, char here) {
    	// Using string library
    	//word.replaceAll("" + gone, "" + here);	
    	
    	
    	char[] cArray = word.toCharArray();
    	for(char c : cArray) {
    		if(c == gone) {
    			c = gone;
    		}
    	}
    	return new String(cArray);
    }
    

    public static void main(String[] args) {
        boolean hasLetter = StringsForEach.hasLetter("ThisString", 'i');
        System.out.println(hasLetter);
        
        System.out.println(StringsForEach.replace("a happy", 'a', 'i'));
    }
}
