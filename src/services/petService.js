import { supabase } from './supabase';

export const petService = {
  async createPet(userId, name) {
    return await supabase
      .from('pets')
      .insert([
        {
          user_id: userId,
          name,
          hunger: 100,
          happiness: 100,
          energy: 100,
        },
      ])
      .select()
      .single();
  },

  async updatePetStats(petId, stats) {
    return await supabase
      .from('pets')
      .update(stats)
      .eq('id', petId);
  },

  subscribeToUpdates(petId, callback) {
    return supabase
      .channel(`pet:${petId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'pets',
        filter: `id=eq.${petId}`,
      }, callback)
      .subscribe();
  },
};