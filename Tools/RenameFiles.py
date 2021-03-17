from multiprocessing import Pool
import glob, os, sys, re

# Prefix_filter = "Probabilistic ML*"

# Prob .* - (Lecture 1 - Introduction) - .* (.mp4)
#pattern = r"Prob[^—]*— ([^-]*-[^-]*)-[^.]*(\..*)"
# Statist.* - () - () .()
#pattern = r".* (Part [^-]*)-([^-]*-[^-]*)-[^.-]*(\..*)"
pattern = r"([^ ]* [^ ]*) (.*)"

if __name__ == "__main__":
    input_path = sys.argv[1]
    total = 0
    none_count = 0

    if os.path.isdir(input_path):
        files = list(os.listdir(input_path))

        for old_name in files:
            total += 1
            #print(old_name)
            m_obj = re.match(pattern, old_name)

            if m_obj is None:
                print(old_name)
                none_count += 1
            elif m_obj.lastindex != 2:
                print(old_name)
                #new_name = "".join(m_obj.groups())
                #print("0 {}".format(m_obj[0]))
                #print("1 {}".format(m_obj[1]))
                #print("2 {}".format(m_obj[2]))
                ## print("3 {}".format(m_obj[3]))
                #print("size: {} name: {}".format(m_obj.lastindex, new_name))
            else:
                new_name = "".join(m_obj.groups())
                new_path = os.path.join(input_path, new_name)
                old_path = os.path.join(input_path, old_name)
                os.rename(old_path, new_path)
                #print("Rename file \"{}\" to \"{}\"".format(old_name, new_name))
                #print("{}".format(new_name))

            # end for
        print(none_count)
        print(total)
        # end if os.path..
    # end if __name__..

